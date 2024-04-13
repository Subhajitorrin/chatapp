import React, { useEffect, useRef, useState } from "react";
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
  onSnapshot,
  doc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { toast } from "react-toastify";

function List({ user, setCurrentChatWith, setCurrentChatId,setToggleNewChat }) {
  const [toggle, setToggle] = useState(true);
  const [findUser, setFindUser] = useState("");
  const [findUsersList, setFindUsersList] = useState([]);
  const [sideChatList, setSideChatList] = useState([]);
  const addUserRef = useRef(null);
  function handelFindUser() {
    if (addUserRef.current.classList.contains("addUserActive")) {
      addUserRef.current.classList.remove("addUserActive");
    } else {
      addUserRef.current.classList.add("addUserActive");
    }
    setFindUsersList([])
    setFindUser("")
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
        if (users.length === 0) {
          toast.warn("No user found!");
        } else {
          setFindUsersList(users);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", user.id), (doc) => {
      // console.log(doc.data());
      setSideChatList(doc.data().chats);
    });
    return () => {
      unsub();
    };
  }, []);

  // console.log("side chats ", sideChatList);

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
              value={findUser}
            />
            <button onClick={handelUserSearch}>Search</button>
            {/* <FindUserCard /> */}
            {findUsersList.map((item, index) => {
              // console.log(item);
              return (
                <FindUserCard
                  key={index}
                  image={item.avatarUrl}
                  name={item.username}
                  id={item.id}
                  currUser={user}
                  setToggle={setToggle}
                  handelFindUser={handelFindUser}
                  setFindUser={setFindUser}
                  setFindUsersList={setFindUsersList}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="listofusers">
        {/* <ChatListCard /> */}
        {sideChatList.map((item, index) => {
          // console.log(item);
          return (
            <ChatListCard
              key={index}
              receiverId={item.receiverId}
              lastMessage={item.lastMessage}
              setCurrentChatWith={setCurrentChatWith}
              chatId={item.chatId}
              setCurrentChatId={setCurrentChatId}
              setToggleNewChat={setToggleNewChat}
            />
          );
        })}
      </div>
    </div>
  );
}

export default List;
