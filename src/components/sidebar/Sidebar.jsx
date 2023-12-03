import React, { useState } from 'react'
import SidebarHeader from './header/SidebarHeader'
import { Notifications } from './notifications'
import { Search, SearchResults } from './search'
import {Conversations} from './conversations'

const Sidebar = () => {
  const [searchResults,setSearchResults] = useState([])
  return (
    <div className=' w-[30%] h-full select-none'>
      {/* sidebar header */}
    <SidebarHeader/>

    <Notifications/>
    {/* Notifications */}


    {/* Search bar */}
    <Search searchLength={searchResults.length} setSearchResults={setSearchResults}/>

    {
      searchResults.length > 0 ? <SearchResults searchResults={searchResults}/> : <Conversations/>
    }

    </div>
  )
}

export default Sidebar