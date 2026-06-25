import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Copy, Check, Bot, User } from 'lucide-react'

export default function MessageBubble({ message }) {
  const [copied, setCopied] = useState(false)
  const isUser = message.role === 'user'

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`flex items-end gap-3 animate-slide-up ${isUser ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser
          ? 'bg-surface-600 border border-surface-500'
          : 'bg-gradient-to-br from-brand-500 to-brand-600'
      }`}>
        {isUser ? <User size={14} className="text-zinc-300" /> : <Bot size={14} className="text-white" />}
      </div>

      {/* Bubble */}
      <div className={`group relative max-w-[75%] ${isUser ? 'items-end' : 'items-start'} flex flex-col`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-brand-500 text-white rounded-br-sm'
            : 'bg-surface-700 text-zinc-100 rounded-bl-sm prose-chat'
        }`}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown>{message.content}</ReactMarkdown>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute -top-7 right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs text-zinc-400 hover:text-white bg-surface-700 px-2 py-1 rounded-md border border-surface-600"
        >
          {copied ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
          {copied ? 'Copied' : 'Copy'}
        </button>

        {/* Timestamp */}
        <span className="text-xs text-zinc-600 mt-1 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  )
}
