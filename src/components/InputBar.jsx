import { useState, useRef } from 'react'
import { Send, Mic } from 'lucide-react'

export default function InputBar({ onSend, isLoading }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  const handleSend = () => {
    if (!text.trim() || isLoading) return
    onSend(text.trim())
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleInput = (e) => {
    setText(e.target.value)
    // Auto-resize textarea
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px'
  }

  return (
    <div className="p-4 border-t border-surface-700">
      <div className="flex items-end gap-3 bg-surface-700 rounded-2xl px-4 py-3 border border-surface-600 focus-within:border-brand-500 transition-colors">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything… (Shift+Enter for new line)"
          rows={1}
          disabled={isLoading}
          className="flex-1 bg-transparent text-sm text-zinc-100 placeholder-zinc-500 resize-none outline-none leading-relaxed max-h-40 font-sans disabled:opacity-50"
        />

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleSend}
            disabled={!text.trim() || isLoading}
            className="w-8 h-8 rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      </div>
      <p className="text-center text-xs text-zinc-600 mt-2">
        NexusAI can make mistakes. Verify important info.
      </p>
    </div>
  )
}
