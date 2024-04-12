import React, { useRef, useState } from "react";
import "./List.css";
import { IoMdSearch } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import ChatListCard from "./ChatListCard";
import FindUserCard from "./FindUserCard";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  startAt,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";

function List() {
  const [toggle, setToggle] = useState(true);
  const [findUser, setFindUser] = useState("");
  const [fondUsersList, setFindUsersList] = useState([]);
  const addUserRef = useRef(null);
  function handelFindUser() {
    if (addUserRef.current.classList.contains("addUserActive")) {
      addUserRef.current.classList.remove("addUserActive");
    } else {
      addUserRef.current.classList.add("addUserActive");
    }
  }
  async function handelUserSearch() {
    if (findUser.trim() != "") {
      try {
        const q = query(
          collection(db, "users"),
          where("username", "==", findUser.trim())
        );
        const querySnapshot = await getDocs(q);
        const users = [];
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setFindUsersList(users);
      } catch (err) {
        console.log(err);
      }
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
                setToggle(!toggle);
                handelFindUser();
              }}
            />
          ) : (
            <FaMinus
              className="plusIcon"
              onClick={() => {
                setToggle(!toggle);
                handelFindUser();
              }}
            />
          )}
          <div className="addUserContainer addUserActive" ref={addUserRef}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Find by username"
              onChange={(e) => {
                setFindUser(e.target.value);
              }}
            />
            <button onClick={handelUserSearch}>Search</button>
            {/* <FindUserCard /> */}
            {fondUsersList.map((item, index) => {
              return (
                <FindUserCard
                  key={index}
                  image={item.avatarUrl}
                  name={item.username}
                />
              );
            })}
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
