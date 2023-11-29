import { useSelector } from "react-redux"
import {CommunityIcon,StoryIcon,ChatIcon,DotsIcon} from '../../../svg'

const SidebarHeader = () => {
    const {user} = useSelector((state)=>state.user)
  return (
    <div className=" h-[50px] dark:bg-dark_bg_2 flex items-center p16">
        <div className=" w-full items-center flex justify-between">
            {/* user image */}
            <button className="btn">
                <img src={user.picture} alt={user.name} 
                className="w-full h-full rounded-full object-cover"
                />
            </button>

            {/* user icons */}
            <ul className="flex items-center gap-x-3 ">
                <li>
                    <button className="btn">
                    <CommunityIcon  className="dark:fill-dark_svg_1"/>
                    </button>
                </li>

                <li>
                    <button className="btn">
                    <StoryIcon  className="dark:fill-dark_svg_1"/>
                    </button>
                </li>

                <li>
                    <button className="btn">
                    <ChatIcon  className="dark:fill-dark_svg_1"/>
                    </button>
                </li>

                <li>
                    <button className="btn">
                    <DotsIcon  className="dark:fill-dark_svg_1"/>
                    </button>
                </li>
            </ul>
        </div>
    </div>
  )
}

export default SidebarHeader