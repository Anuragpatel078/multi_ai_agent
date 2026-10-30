import { useSelector } from 'react-redux'

const ChatArea = () => {
  const activeConversationId = useSelector(state => state.conversation.activeConversationId)
  const activeConversation = useSelector(state =>
    state.conversation.conversations.find(conversation => conversation._id === activeConversationId)
  )

  return (
    <div className='flex-1 flex flex-col'>
      {activeConversation ? activeConversation.title : 'ChatArea'}
    </div>
  )
}

export default ChatArea