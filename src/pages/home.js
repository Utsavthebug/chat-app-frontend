import React, { useContext, useEffect, useRef, useState } from 'react'
import { Sidebar } from '../components/sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getConversations } from '../features/chatSlice'
import { WhatsappHome } from '../components/Chat'
import {ChatContainer} from '../components/Chat'
import SocketContext from '../context/SocketContext'
import { updateMessagesAndConversations,addOnlineUsers,addTyping } from '../features/chatSlice'
import Call from '../components/Chat/call/Call'
import { getConversationId, getConversationImage, getConversationName } from '../utils/chat'
import Peer from 'simple-peer'

const callData = {
  receivingCall:false,
  callEnded:false,
  socketId:"",
  name:"",
  picture:"",
  signal:""
}

const Home = () => {
  const dispatch = useDispatch()

  const [call,setCall] = useState(callData)
  const [stream,setStream] = useState()
  const [show,setShow] = useState(false)
  const [totalSecInCall,setTotalSecInCall] = useState(0)
  const [callAccepted,setCallAccepted] = useState(false)
  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  //use context
  const socket = useContext(SocketContext)

  const {receivingCall,callEnded} = call

  const {user} = useSelector((state)=>state.user)

  const {activeConversation,onlineUsers} = useSelector((state)=>state.chat)

  //join user into socket io
  useEffect(()=>{
    socket.emit("join",user._id)

    //get online users
    socket.on('get-online-users',(users)=>{
      dispatch(addOnlineUsers(users))
    })

    //listening when a user is typing
    socket.on("typing",(conversation)=> dispatch(addTyping(conversation)))
    socket.on("stop typing",()=>dispatch(addTyping(null)))

  

  },[dispatch,user,socket])

  //call
  useEffect(()=>{
    setupMedia ()

    socket.on('setup socket',(id)=>{
      setCall({
        ...call,
        socketId:id
      })
    })

  socket.on('call user',(data)=>{
    setCall({
      ...call,
      socketId:data.from,
      name:data.name,
      picture:data.picture,
      signal:data.signal,
      receivingCall:true
    })
  })


  socket.on('end call',()=>{
    setShow(false)
    setCall({
      ...call,
      callEnded:true,
      receivingCall:false
    })
    myVideo.current.srcObject=null

    if(callAccepted){
    connectionRef?.current?.destroy()
    }

  })

  },[])

  const callUser = ()=>{

    enableMedia()

    setCall({
      ...call,
      name:getConversationName(user,activeConversation.users),
      picture:getConversationImage(user,activeConversation.users)
    })

    //initiating peer connection
    const peer = new Peer({
      initiator:true,
      trickle:false,
      stream
    })

    peer.on('signal',(data)=>{
      socket.emit('call user',{
        userToCall:getConversationId(user,activeConversation.users),
        signal:data,
        from:call.socketId,
        name:user?.name,
        picture:user?.picture
      })
    })

  peer.on('stream',(stream)=>{
    userVideo.current.srcObject = stream
  })

  socket.on('call accepted',(signal)=>{
    setCallAccepted(true)
    peer.signal(signal);
  })

  connectionRef.current = peer;
  
  }

  const endCall = ()=>{
    setShow(false)
    setCall({
      ...call,
      callEnded:true,
      receivingCall:false
    })
    myVideo.current.srcObject=null;
    socket.emit("end call",call.socketId)
    connectionRef?.current?.destroy()
  }

  //answer call function
  const answerCall = ()=>{
    enableMedia()
    setCallAccepted(true)

    const peer = new Peer({
      initiator:false,
      trickle:false,
      stream
    })

    peer.on("signal",(data)=>{
      socket.emit('answer call',{
        signal:data,
        to:call.socketId
      })
    });


    peer.on('stream',(stream)=>{
      userVideo.current.srcObject = stream
    })

    peer.signal(call.signal);
    connectionRef.current=peer
  }



  const  setupMedia  = ()=>{
    navigator.mediaDevices.getUserMedia({video:true,audio: true}).then((stream)=>{
      setStream(stream);
    })
  }

  const enableMedia = ()=>{
  myVideo.current.srcObject = stream
  setShow(true)
  }
  
  //get conversations
  useEffect(()=>{
    if(user?.token){
      dispatch(getConversations(user.token))
    }
  },[user,dispatch])

  //listening to received messages 
  useEffect(()=>{
    socket.on("message received",(message) =>{
      dispatch(updateMessagesAndConversations(message))
    })
  },[dispatch,socket])

  return (
    <>
    <div className='h-screen dark:bg-dark_bg_1 flex  justify-center overflow-hidden'>
      {/* container */}
      <div className='container h-screen flex py-[19px]'>
      {/* sidebar */}
      <Sidebar onlineUsers={onlineUsers}/>
      {
        activeConversation?._id ? <ChatContainer callUser={callUser} /> : <WhatsappHome/>
      }

      </div>
    </div>
    {/* Call */}
    <div className={(show || call.signal) && !call.callEnded ? '': 'hidden'}>
    <Call 
    call={call} 
    setCall={setCall} 
    callAccepted={callAccepted} 
    setCallAccepted={setCallAccepted}
    userVideo={userVideo}
    myVideo={myVideo}
    answerCall={answerCall}
    stream={stream}
    show={show}
    endCall={endCall}
    totalSecInCall={totalSecInCall}
    setTotalSecInCall={setTotalSecInCall}
    />
    </div>

    </>
  )
}

export default Home