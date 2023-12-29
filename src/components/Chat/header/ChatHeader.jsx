import { useSelector } from "react-redux"
import { DotsIcon, SearchLargeIcon,  VideoCallIcon,  CallIcon } from "../../../svg"
import { capitalize } from "../../../utils/string"


const ChatHeader = ({online,callUser}) => {
  const {activeConversation} = useSelector((state)=>state.chat)
  const {name,picture} = activeConversation

    return (
    <div className="h-[59px] select-none flex items-center p16 dark:bg-dark_bg_2">
        {/* Container */}
        <div className="w-full flex items-center justify-between">
            {/* Left */}
            <div className="flex items-center gap-x-4">
                {/* Conversation image */}
                <button className="btn">
                    <img src={picture} alt={`${name} picture`}  className="h-full w-full rounded-full object-cover"/>
                </button>

            <div className="flex flex-col">
                <h1 className="dark:text-white text-md font-bold">{capitalize(name.split(" ")[0])}</h1>
                <span className=" text-xs dark:text-dark_svg_2">{online ? 'online':''}</span>
            </div>
            </div>
        
        {/* Right */}
        <ul  className="flex items-center gap-x-2.5">

   {
    online &&  <li onClick={() => callUser()}>
    <button className="btn">
    <VideoCallIcon />
    </button>
</li>
   }

   {
    online &&  <li>
    <button className="btn">
    <CallIcon />
    </button>
    </li>

   }


  

        <li>
            <button className="btn">
            <SearchLargeIcon  className={"dark:fill-dark_svg_1"}/>
            </button>
        </li>

        <li>
            <button className="btn">
            <DotsIcon  className={"dark:fill-dark_svg_1"}/>
            </button>
        </li>
        </ul>
        </div>

    </div>
  )
}

export default ChatHeader