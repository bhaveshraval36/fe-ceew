import ChatWindow from '@/app/components/chat-screen/ChatWindow'
import ProtectedRoute from '@/app/components/auth/ProtectedRoute'

const ChatPage = () => {
  return (
    <ProtectedRoute>
    <ChatWindow/>
    </ProtectedRoute>
  )
}

export default ChatPage