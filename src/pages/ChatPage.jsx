import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import ChatWindow from '../components/ChatWindow'
import { useChat } from '../hooks/useChat'

export default function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const {
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
  } = useChat()

  return (
    <div className="flex h-full w-full bg-surface-900">
      <Sidebar
        sessions={sessions}
        activeSessionId={activeSession?.id || null}
        onNewChat={startNewChat}
        onLoadSession={loadSession}
        onDeleteSession={deleteSession}
        onClearAll={clearAllHistory}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={sendMessage}
        onOpenSidebar={() => setSidebarOpen(true)}
      />
    </div>
  )
}