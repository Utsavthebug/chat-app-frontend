import React from 'react'
import EmojiPicker from './EmojiPicker'
import Attachments from './Attachments'
import { SendIcon } from '../../../svg'
import Input from './Input'

const ChatActions = () => {
  return (
    <form action="" className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 px-4 select-none'>
        <div className="w-full flex items-center gap-x-2">
            {/* Emojis and attachments */}
            <ul className='flex gap-x-2'>    
                <EmojiPicker/>
                <Attachments />
            </ul>

            {/* Inputs */}
            <Input />

            {/* Send button */}
            <button className='btn'>
                <SendIcon className={"dark:fill-dark_svg_1"} />
            </button>
        </div>
    </form>
    )
}

export default ChatActions