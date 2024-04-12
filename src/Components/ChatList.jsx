import React from 'react'
import "./ChatList.css"
import UserInfo from "./UserInfo"
import List from "./List"

function ChatList() {
  return (
    <div className="chatlistContainer">
      <UserInfo/>
      <List/>
    </div>
  )
}

export default ChatList