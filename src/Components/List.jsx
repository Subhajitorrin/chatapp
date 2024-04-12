import React, { useRef, useState } from "react";
import "./List.css";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import ChatListCard from "./ChatListCard";

function List() {
  const [toggle, setToggle] = useState(true);
  const addUserRef = useRef(null)
  function handelFindUser(){
    if(addUserRef.current.classList.contains("addUserActive")){
      addUserRef.current.classList.remove("addUserActive")
    }else{
      addUserRef.current.classList.add("addUserActive")
    }
  }
  return (
    <div className="listContainer">
      <div className="search">
        <div className="searchBar">
          <IoMdSearch className="searchIconn" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search user"
            style={{ userSelect: "none" }}
          />
        </div>
        <div className="plusMinus">
          {toggle ? (
            <FaPlus
              className="plusIcon"
              onClick={() => {
                setToggle(!toggle);handelFindUser();
              }}
            />
          ) : (
            <FaMinus
              className="plusIcon"
              onClick={() => {
                setToggle(!toggle);handelFindUser();
              }}
            />
          )}
          <div className="addUserContainer addUserActive" ref={addUserRef}>
            <input type="text" name="" id="" placeholder="Find by username" />
            <button>Search</button>
            <div className="user">
              <div className="searchImgAndusernameContainer">
                <div className="userimgcontainer">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCe_lWmhlCdO7BloszzyO1iPjApWMgitzkuB5ezk3Ig&s"
                    alt=""
                  />
                </div>
                <h4>Subhajit Ghosh</h4>
              </div>
              <button>Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className="listofusers">
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
        <ChatListCard />
      </div>
    </div>
  );
}

export default List;
