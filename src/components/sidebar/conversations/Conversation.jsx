import moment from "moment"
import { dateHandler } from "../../../utils/date"
import { useDispatch, useSelector } from "react-redux"
import {setActiveConversation} from '../../../features/chatSlice'
import { capitalize } from "../../../utils/string"

const Conversation = ({convo}) => {
    const dispatch = useDispatch()
   
    const openConversation = ()=>{
    dispatch(setActiveConversation(convo))
    }

    const {activeConversation} = useSelector((state)=>state.chat)

  return (
   <li 
   onClick={openConversation}
   className={`list-none h-[72px] w-full dark:bg-dark_bg_1 hover:${convo._id!==activeConversation?._id ? "dark:bg-dark_bg_2 cursor-pointer" : ""} dark:text-dark_text_1 px-[10px] ${convo?._id===activeConversation?._id ? "dark:bg-dark_hover_1": ""}`}>
    {/* Container */}
    <div className="relative w-full flex items-center justify-between py-[10px]">
        {/* left */}
        <div className='flex items-center gap-x-3'>
            <div className="relative max-w-[50px] max-h-[50px] rounded-full overflow-hidden">
                <img src={convo?.picture} alt={convo?.name}  className='w-full h-full object-cover'/>
            </div>

            <div className="w-full flex flex-col">
                {/* conversation name */}
                <h1 className='font-bold flex items-center gap-x-2'>
                    {capitalize(convo?.name)}
                </h1>

                <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                    <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                        <p>{convo?.latestMessage?.message.length >25 ? `${convo?.latestMessage?.message.substring(0,25)}..`: convo?.latestMessage?.message }</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
            <span className=" dark:text-dark_text_2">
                {convo?.latestMessage?.createdAt ? dateHandler(convo?.latestMessage?.createdAt):""}
            </span>
        </div>
    </div>
    <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
   </li>
  )
}

export default Conversation