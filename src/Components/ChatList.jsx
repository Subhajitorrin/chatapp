import React from 'react'
import "./ChatList.css"
import UserInfo from "./UserInfo"
import List from "./List"

function ChatList({user}) {
  return (
    <div className="chatlistContainer">
      <UserInfo user={user}/>
      <List/>
    </div>
  )
}

export default ChatList