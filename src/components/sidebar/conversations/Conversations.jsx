import { useSelector } from "react-redux"
import Conversation from "./Conversation"

const Conversations = () => {
  const {conversations} = useSelector((state)=> state.chat)

  return (
    <div className='convos scrollbar'>
      <ul>
      {
        conversations && conversations.map((convo,i)=>(
          <Conversation convo={convo} id={convo?._id}/>
        ))
      }
      </ul>
  
    </div>
  )
}

export default Conversations