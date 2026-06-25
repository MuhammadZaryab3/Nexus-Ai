import { Bot } from 'lucide-react'

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3 animate-fade-in">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-white" />
      </div>

      {/* Dots */}
      <div className="bg-surface-700 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce-dot dot-1 inline-block" />
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce-dot dot-2 inline-block" />
        <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce-dot dot-3 inline-block" />
      </div>
    </div>
  )
}
