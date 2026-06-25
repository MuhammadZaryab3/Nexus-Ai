import { useEffect, useRef } from 'react'
import { Bot, Sparkles, Code2, BookOpen, Lightbulb, Menu } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import InputBar from './InputBar'

const SUGGESTIONS = [
  { icon: Code2, label: 'Write a React component', text: 'Write me a React component for a responsive navbar with a mobile menu.' },
  { icon: Lightbulb, label: 'Explain a concept', text: 'Explain how useEffect works in React with a simple example.' },
  { icon: BookOpen, label: 'Debug my code', text: 'Help me understand why useState doesn\'t update immediately after calling the setter.' },
  { icon: Sparkles, label: 'Generate ideas', text: 'Give me 5 creative frontend project ideas to add to my portfolio.' },
]

export default function ChatWindow({ messages, isLoading, error, onSend, onOpenSidebar }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isEmpty = messages.length === 0

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">

      {/* Header */}
      <div className="flex-shrink-0 h-14 border-b border-surface-700 flex items-center gap-3 px-4 md:px-6">
        {/* Hamburger — always rendered on mobile, never hidden */}
        <button
          onClick={onOpenSidebar}
          className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-700 transition-colors flex-shrink-0"
        >
          <Menu size={20} />
        </button>

        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse flex-shrink-0" />
        <h1 className="font-semibold text-white text-sm leading-none">NexusAI Chat</h1>
        <span className="hidden sm:inline text-xs text-zinc-500 font-mono leading-none">
          powered by Muhammad Zaryab
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center min-h-full text-center gap-6 sm:gap-8 px-4" style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1rem)' }}>
            <div>
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center mx-auto mb-4">
                <Bot size={24} className="text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold text-white mb-2">How can I help?</h2>
              <p className="text-zinc-400 text-sm max-w-xs">
                Ask me anything — code, ideas, explanations, or just have a conversation.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {SUGGESTIONS.map(({ icon: Icon, label, text }) => (
                <button
                  key={label}
                  onClick={() => onSend(text)}
                  className="flex items-center gap-3 px-4 py-3 bg-surface-700 hover:bg-surface-600 border border-surface-600 hover:border-surface-500 rounded-xl text-left transition-all group"
                >
                  <Icon size={16} className="text-brand-400 flex-shrink-0" />
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{label}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isLoading && <TypingIndicator />}
            {error && (
              <div className="flex justify-center px-4">
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-2 rounded-xl text-center">
                  {error}
                </div>
              </div>
            )}
          </>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input — always has safe area padding */}
      <div className="flex-shrink-0">
        <InputBar onSend={onSend} isLoading={isLoading} />
      </div>

    </div>
  )
}