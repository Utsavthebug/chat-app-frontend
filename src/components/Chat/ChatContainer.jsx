import { useDispatch, useSelector } from "react-redux"
import ChatHeader from "./header/ChatHeader"
import ChatMessages from "./messages/ChatMessages"
import { useEffect } from "react"
import { getConversationMessages } from "../../features/chatSlice"
import { ChatActions } from "./actions"
import { checkOnlineStatus } from "../../utils/chat"

const ChatContainer = () => {
  const {activeConversation,onlineUsers} = useSelector((state)=>state.chat)
  const {user} = useSelector((state)=> state.user)
  const {token} = user
  const dispatch = useDispatch()

  useEffect(()=>{
    if(activeConversation?._id){  
      dispatch(getConversationMessages({
        token,
        convo_id:activeConversation?._id
      }))
    }

  },[activeConversation])

  return (
    <div className="relative w-full h-full dark:border-l-dark_border_2 select-none overflow-hidden">
      {/* Container */}
      <div>
        {/* chat header */}
        <ChatHeader online={checkOnlineStatus(onlineUsers,user,activeConversation.users)} />

        {/* chat messages */}
        <ChatMessages />

        {/* Chat Actions */}
        <ChatActions />
      </div>
    </div>
  )
}

export default ChatContainer