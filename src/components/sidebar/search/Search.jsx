import { useState } from "react"
import { FilterIcon, ReturnIcon,SearchIcon } from "../../../svg"

const Search = ({
  searchLength
}) => {
  const [show,setShow] = useState(false)

  const handleSearch = (e) =>{
    console.log(e.target.value)
  }

  return (
    <div className=" h-[49px] py-1.5">
      <div className=" px-[10px]">
      {/* search input container */}
      <div className="flex items-center gap-x-2">
        <div className="flex w-full dark:bg-dark_bg_2 rounded-lg pl-2">
        {
          show || searchLength > 0 ? ( <span className="w-8 flex items-center justify-center rotateAnimation">
              <ReturnIcon className="fill-green_1 w-5" />
          </span> ): (<span className="w-8 flex items-center justify-center">
              <SearchIcon className="dark:fill-dark_svg_2 w-5" />
          </span>)
        }
        <input type="text" 
        className="input"
        placeholder="Search or start a new chat" 
        onFocus={()=>setShow(true)}
        onBlur={()=> searchLength=== 0 && setShow(false) }
        onKeyDown={handleSearch}
        />
        </div>

        <button className="btn">
          <FilterIcon className="dark:fill-dark_svg_2"/>
        </button>
      </div>
      </div>
    </div>
  )
}

export default Search