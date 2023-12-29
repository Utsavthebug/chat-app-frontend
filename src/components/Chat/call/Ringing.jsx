import { useEffect, useRef, useState } from "react"
import { CloseIcon, ValidIcon } from "../../../svg"

const Ringing = ({
  call,
  setCall,
  answerCall,
  endCall
}) => {
  const {receivingCall,callEnded,name,picture} = call
  const [timer,setTimer] = useState(0)


  let interval;

  const handleTimer = ()=>{
    interval = setInterval(()=>{
      setTimer((prev)=>prev+1)
    },1000)
  }

  useEffect(()=>{
    if(timer<5){
      handleTimer()
    } else{
      setCall({
        ...call,
        receivingCall:false
      })
    }
    return ()=>{
      clearInterval(interval)
    }
  },[timer])


  return (
    <div className=" dark:bg-dark_bg_1 rounded-lg fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg z-30">
      {/* Container */}
      <div className="p-4 flex items-center justify-between gap-x-8">
      {/* Call info */}
      <div className="flex items-center gap-x-2">
        <img src={picture}
        alt="call image" 
        className="w-28 h-28 rounded-full"
        />

        <div>
          <h1 className=" dark:text-white">
            <b>{name}</b>
          </h1>

          <span className="dark:text-dark_text_2">
            Whatsapp video...
          </span>
        </div>
      </div>

    <ul className="flex items-center gap-x-2">
    <li onClick={endCall}>
     <button className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500">
      <CloseIcon className={"fill-white w-5"}/>
     </button>
    </li>

    <li>
     <button onClick={answerCall}  className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500">
      <ValidIcon className={"fill-white w-6 mt-2"}/>
     </button>
    </li>

    </ul>
      </div>
      {/* Ringtone */}
      <audio autoplay loop>
        <source src="../../../../audio/ringtone.mp3" type="" />
      </audio>
    </div>
  )
}

export default Ringing