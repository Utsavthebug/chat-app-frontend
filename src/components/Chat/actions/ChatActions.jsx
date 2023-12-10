import React, { useRef, useState } from 'react'
import EmojiPickerApp from './EmojiPickerApp'
import Attachments from './Attachments'
import { SendIcon } from '../../../svg'
import Input from './Input'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

const ChatActions = () => {
  const [message,setMessage] = useState("") 
    const dispatch = useDispatch()

    const {activeConversation,status} = useSelector((state)=>state.chat)
    const {user} = useSelector((state)=>state.user)
    const {token} = user

    const values = {
        message,
        convo_id:activeConversation?._id,
        files:[],
        token
    }

    const textRef = useRef()

  const sendMessageHandler = async(e)=>{
    e.preventDefault()
    await dispatch(setMessage(values))
    setMessage("")
  }

  return (
    <form onSubmit={(event)=>sendMessageHandler(event)} action="" className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none'>
        <div className="w-full flex items-center gap-x-2">
            {/* Emojis and attachments */}
            <ul className='flex gap-x-2'>    
                <EmojiPickerApp textRef={textRef} message={message} setMessage={setMessage} />
                <Attachments />
            </ul>

            {/* Inputs */}
            <Input message={message} setMessage={setMessage} textRef={textRef}/>

            {/* Send button */}
            <button type='submit' className='btn'>
                {
                    status ==="loading" ? <ClipLoader color="#E9EDEF" size={25}/> : <SendIcon className={"dark:fill-dark_svg_1"} />
                }
               
            </button>
        </div>
    </form>
    )
}

export default ChatActions