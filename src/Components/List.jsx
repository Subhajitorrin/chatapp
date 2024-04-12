import React, { useState } from "react";
import "./List.css";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import ChatListCard from "./ChatListCard";

function List() {
  const [toggle, setToggle] = useState(false);
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
          />
        </div>
        {toggle ? (
          <FaPlus
            className="plusIcon"
            onClick={() => {
              setToggle(!toggle);
            }}
          />
        ) : (
          <FaMinus
            className="plusIcon"
            onClick={() => {
              setToggle(!toggle);
            }}
          />
        )}
      </div>
      <div className="listofusers">
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
        <ChatListCard/>
      </div>
    </div>
  );
}

export default List;
