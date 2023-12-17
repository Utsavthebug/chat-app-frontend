import React, { useContext, useEffect } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice'
import { WhatsappHome } from '../components/Chat'
import {ChatContainer} from '../components/Chat'
import SocketContext from '../context/SocketContext'
import { updateMessagesAndConversations } from '../features/chatSlice'

const Home = () => {
  const dispatch = useDispatch()

  //use context
  const socket = useContext(SocketContext)

  const {user} = useSelector((state)=>state.user)

  const {activeConversation} = useSelector((state)=>state.chat)

  //join user into socket io
  useEffect(()=>{
    socket.emit("join",user._id)
  },[user])
  
  //get conversations
  useEffect(()=>{
    if(user?.token){
      dispatch(getConversations(user.token))
    }
  },[user,dispatch])

  //listening to received messages 
  useEffect(()=>{
    socket.on("receive message",message =>{
      dispatch(updateMessages(message))
    })
  },[])

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