import { ThemeProvider } from './context/ThemeContext'
import ChatPage from './pages/ChatPage'

export default function App() {
  return (
    <ThemeProvider>
      <ChatPage />
    </ThemeProvider>
  )
}