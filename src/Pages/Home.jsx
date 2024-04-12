import React from 'react'
import "./Home.css"
import ChatList from '../Components/ChatList'
import Chat from '../Components/Chat'
import Details from "../Components/Details"

function Home({user,setUpdate}) {
  return (
    <div className="homeContainer">
        <ChatList user={user} setUpdate={setUpdate}/>
        <Chat/>
        <Details/>
    </div>
  )
}

export default Home