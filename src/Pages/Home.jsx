import React from 'react'
import "./Home.css"
import ChatList from '../Components/ChatList'
import Chat from '../Components/Chat'
import Details from "../Components/Details"

function Home() {
  return (
    <div className="homeContainer">
        <ChatList/>
        <Chat/>
        <Details/>
    </div>
  )
}

export default Home