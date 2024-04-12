import React from 'react'
import "./ChatList.css"
import UserInfo from "./UserInfo"
import List from "./List"

function ChatList({user,setUpdate}) {
  return (
    <div className="chatlistContainer">
      <UserInfo user={user} setUpdate={setUpdate}/>
      <List/>
    </div>
  )
}

export default ChatList