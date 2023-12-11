import React, { useEffect } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice'
import { WhatsappHome } from '../components/Chat'
import {ChatContainer} from '../components/Chat'

const Home = () => {
  const dispatch = useDispatch()

  const {user} = useSelector((state)=>state.user)

  const {activeConversation} = useSelector((state)=>state.chat)

  
  //get conversations
  useEffect(()=>{
    if(user?.token){
      dispatch(getConversations(user.token))
    }
  },[user,dispatch])

  return (
    <div className='h-screen dark:bg-dark_bg_1 flex  justify-center overflow-hidden'>
      {/* container */}
      <div className='container h-screen flex py-[19px]'>
      {/* sidebar */}
      <Sidebar/>
      {
        activeConversation?._id ? <ChatContainer/> : <WhatsappHome/>
      }

      </div>

    </div>
  )
}

export default Home