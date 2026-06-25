import { useState, useCallback } from 'react'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadHistoryFromStorage() {
  try {
    return JSON.parse(localStorage.getItem('chat_sessions') || '[]')
  } catch {
    return []
  }
}

function saveHistoryToStorage(sessions) {
  localStorage.setItem('chat_sessions', JSON.stringify(sessions))
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

async function callGeminiWithRetry(contents, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(API_URL, { contents })
      return response
    } catch (err) {
      const status = err.response?.status
      const isRetryable = status === 503 || status === 429 || !status
      const isLast = i === retries - 1

      if (isRetryable && !isLast) {
        await sleep(1500 * (i + 1))
        continue
      }
      throw err
    }
  }
}

export function useChat() {
  const [sessions, setSessions] = useState(loadHistoryFromStorage)
  const [activeSessionId, setActiveSessionId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const activeSession = sessions.find(s => s.id === activeSessionId) || null
  const messages = activeSession?.messages || []

  const startNewChat = useCallback(() => {
    setActiveSessionId(null)
    setError(null)
  }, [])

  const loadSession = useCallback((sessionId) => {
    setActiveSessionId(sessionId)
    setError(null)
  }, [])

  const deleteSession = useCallback((sessionId) => {
    setSessions(prev => {
      const updated = prev.filter(s => s.id !== sessionId)
      saveHistoryToStorage(updated)
      return updated
    })
    if (activeSessionId === sessionId) setActiveSessionId(null)
  }, [activeSessionId])

  const clearAllHistory = useCallback(() => {
    setSessions([])
    saveHistoryToStorage([])
    setActiveSessionId(null)
  }, [])

  const sendMessage = useCallback(async (userText) => {
    if (!userText.trim() || isLoading) return
    setError(null)

    const userMsg = {
      id: generateId(),
      role: 'user',
      content: userText,
      timestamp: Date.now(),
    }

    let sessionId = activeSessionId
    let isNewSession = false

    if (!sessionId) {
      sessionId = generateId()
      isNewSession = true
    }

    // Snapshot current messages BEFORE setState (avoids stale closure)
    const existingMessages = sessions.find(s => s.id === sessionId)?.messages || []

    setSessions(prev => {
      let updated
      if (isNewSession) {
        const newSession = {
          id: sessionId,
          title: userText.slice(0, 40) + (userText.length > 40 ? '…' : ''),
          messages: [userMsg],
          createdAt: Date.now(),
        }
        updated = [newSession, ...prev]
      } else {
        updated = prev.map(s =>
          s.id === sessionId
            ? { ...s, messages: [...s.messages, userMsg] }
            : s
        )
      }
      saveHistoryToStorage(updated)
      return updated
    })

    if (isNewSession) setActiveSessionId(sessionId)
    setIsLoading(true)

    try {
      // Build full conversation history for multi-turn context
      const allMessages = [...existingMessages, userMsg]

      const contents = allMessages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }],
      }))

      const response = await callGeminiWithRetry(contents)

      const aiText =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'Sorry, I could not generate a response.'

      const aiMsg = {
        id: generateId(),
        role: 'assistant',
        content: aiText,
        timestamp: Date.now(),
      }

      setSessions(prev => {
        const updated = prev.map(s =>
          s.id === sessionId
            ? { ...s, messages: [...s.messages, aiMsg] }
            : s
        )
        saveHistoryToStorage(updated)
        return updated
      })
    } catch (err) {
      const status = err.response?.status
      const errMsg =
        status === 400 ? 'Bad request — check your API key in .env'
        : status === 403 ? 'API key invalid or Gemini not enabled'
        : status === 404 ? 'Model not found — contact support'
        : status === 429 ? 'Rate limit hit — please wait and retry'
        : status === 503 ? 'Gemini is overloaded — please try again'
        : 'Something went wrong — please try again'
      setError(errMsg)
    } finally {
      setIsLoading(false)
    }
  }, [activeSessionId, isLoading, sessions])

  return {
    sessions,
    activeSession,
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
    loadSession,
    deleteSession,
    clearAllHistory,
  }
}