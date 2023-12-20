import { useDispatch, useSelector } from "react-redux"
import { SendIcon } from "../../../../svg"
import Add from "./Add"
import { uploadFiles } from "../../../../utils/upload"
import { useContext, useState } from "react"
import { sendMessage } from "../../../../features/chatSlice"
import SocketContext from "../../../../context/SocketContext"

const HandleAndSend = ({
    setActiveIndex,
    activeIndex,
    message
}) => {
    const socket = useContext(SocketContext)
    const dispatch = useDispatch()
    const {files,activeConversation} = useSelector((state)=>state.chat)
    const {user} = useSelector((state)=>state.user)
    const {token} = user
    const [loading,setLoading] = useState(false)

    const sendMessageHandler = async()=>{
        //upload files first
        setLoading(true)
        const uploaded_files = await uploadFiles(files)
        //send the message
        const values = {
            token,
            message,
            convo_id:activeConversation._id,
            files:uploadFiles.length>0?uploadFiles:[],
        }

        let newMsg = await dispatch(sendMessage(values))
        socket.emit('send message',newMsg.payload)
        setLoading(false)
    }

    return (
    <div className="w-[97%] flex items-center justify-between mt-2 border-t dark:border-dark_border_2">
        {/* Empty */}
        <span></span>
        {/* List Files */}
        <div className="flex items-center gap-x-2">
        {
            files.map((file,i)=>(
                <div 
                key={i} 
                className={`w-14 h-14 border mt-2 dark:border-white rounded-md overflow-hidden cursor-pointer
                ${activeIndex===i ? 'border-[3px] border-green_1':""}
                `}
                onClick={()=>setActiveIndex(i)}
                >
                {
                    file.type==="IMAGE" ?
                    <img className={`w-full h-full object-cover`} src={file.fileData} alt="" /> : 
                    <img src={`../../../../images/file/${file.type}.png`} alt="" className="w-8 h-10 mt-1.5 ml-2.5" />
                }
                </div>
            ))
        }
        {/* Add another files */}
        <Add setActiveIndex={setActiveIndex} />
        </div>

        {/* send button */}
        <div onClick={()=>sendMessageHandler()} className="bg-green_1 w-16 h-16 mt-2 rounded-full items-center cursor-pointer">
        <SendIcon className={"fill-white"}/>
        </div>

    </div>
  )
}

export default HandleAndSend