import { Bot, Plus, Sun, Moon, Trash2, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Sidebar({ sessions, activeSessionId, onNewChat, onLoadSession, onClearAll, isOpen, onClose }) {
  const { isDark, toggleTheme } = useTheme()

  const handleNewChat = () => {
    onNewChat()
    onClose()
  }

  const handleLoadSession = (id) => {
    onLoadSession(id)
    onClose()
  }

  return (
    <>
      {/* Backdrop — only when open on mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar — on mobile: slides in/out. On desktop: always visible */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-64 flex-shrink-0 bg-surface-800 border-r border-surface-700 flex flex-col h-full
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Logo row — same h-14 as chat header */}
        <div className="flex-shrink-0 h-14 px-5 border-b border-surface-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <span className="font-semibold text-white tracking-tight">NexusAI</span>
          </div>
          {/* X button — only visible on mobile when sidebar is open */}
          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-700 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-medium text-sm transition-colors"
          >
            <Plus size={16} />
            New Chat
          </button>
        </div>

        {/* Sessions list */}
        <div className="flex-1 overflow-y-auto px-3 pb-3 space-y-1">
          {sessions.length === 0 && (
            <p className="text-xs text-zinc-500 text-center mt-8 px-4">
              No chats yet. Start a conversation!
            </p>
          )}
          {sessions.map(session => (
            <button
              key={session.id}
              onClick={() => handleLoadSession(session.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors group ${
                activeSessionId === session.id
                  ? 'bg-surface-600 text-white'
                  : 'text-zinc-400 hover:bg-surface-700 hover:text-zinc-200'
              }`}
            >
              <p className="truncate font-medium leading-snug">{session.title}</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {new Date(session.createdAt).toLocaleDateString()}
              </p>
            </button>
          ))}
        </div>

        {/* Bottom actions */}
        <div className="p-3 border-t border-surface-700 flex items-center justify-between">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-700 text-sm transition-colors"
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {sessions.length > 0 && (
            <button
              onClick={onClearAll}
              className="p-2 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-surface-700 transition-colors"
              title="Clear all history"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </aside>
    </>
  )
}