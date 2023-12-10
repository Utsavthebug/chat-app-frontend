import { useSelector } from "react-redux"
import Conversation from "./Conversation"

const Conversations = () => {
  const {conversations,activeConversation} = useSelector((state)=> state.chat)

  console.log('active',activeConversation)

  console.log('active conversatiion',conversations)

  return (
    <div className='convos scrollbar'>
      <ul>
      {
        conversations && conversations.filter((c)=>c.latestMessage || c._id===activeConversation?._id).map((convo,i)=>(
          <Conversation convo={convo} id={convo?._id}/>
        ))
      }
      </ul>
  
    </div>
  )
}

export default Conversations