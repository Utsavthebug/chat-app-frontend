import { useState } from "react"
import CallAction from "./CallAction"
import CallArea from "./CallArea"
import Header from "./Header"
import Ringing from "./Ringing"

const Call = ({
  call,
  setCall,
  callAccepted,
  setCallAccepted,
  answerCall,
  userVideo,
  myVideo,
  stream,
  show,
  endCall,
  totalSecInCall,
  setTotalSecInCall

}) => {
  const {receivingCall,callEnded,name,picture} = call
  const [showActions,setShowActions] = useState(false)
  const [toggle,setToggle] = useState(false)

  return (
    <>
    <div
    onMouseOver={()=>setShowActions(true)}
    onMouseOut={()=>setShowActions(false)}
    className={` ${receivingCall && !callAccepted ? "hidden" : ''}  fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[550px] z-10 rounded-2xl overflow-hidden callbg`}>
      {/* Container */}
      <div>
        {/* Header */}
        <div>
        <Header/>

        {/* Call area */}
        <CallArea
        name={name}
        />

        {/* call actions */}
        {    
        showActions && <CallAction
        endCall={endCall}
        />
        }
        </div>
      {/* Video streams */}
      <div>
        {/* user video */}

        {
          callAccepted && !callEnded ? (  <div>
            <video
            onClick={()=>setToggle((prev)=>!prev)} 
            ref={userVideo} playsInline muted autoPlay className={toggle?`SmallVideoCall ${showActions ? 'moveVideoCall':''} `:'largeVideoCall'}></video>
          </div>) : null
        }

      

        {/* my video */}

        {
          stream ? (
            <div>
            <video 
            onClick={()=>setToggle((prev)=>!prev)}
            ref={myVideo} playsInline muted autoPlay className={toggle?`SmallVideoCall ${showActions ? 'moveVideoCall':''} `:'largeVideoCall'}></video>
          </div>
          ) : null
        }
 
      </div>
      </div>
    </div>

      { 
       receivingCall && !callAccepted && (<Ringing answerCall={answerCall} call={call} setCall={setCall} endCall={endCall}/>)
       }

       {
        !callAccepted && show ? <audio src="../../../../audio/ringing.mp3" autoPlay loop></audio> : null
       } 
    </>
  )
}

export default Call