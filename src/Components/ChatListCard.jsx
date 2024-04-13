import React, { useEffect, useRef, useState } from "react";
import "./ChatListCard.css";
import getUserDetailsWithId from "../Firebase/getUserDetailsWithId";
import { IoRemoveCircle } from "react-icons/io5";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase";

function ChatListCard({
  receiverId,
  lastMessage,
  setCurrentChatWith,
  chatId,
  setCurrentChatId,
}) {
  const [reUser, setReUser] = useState([]);
  const crossRef = useRef(null);
  useEffect(() => {
    getUserDetailsWithId(receiverId).then((res) => {
      setReUser(res);
    });
  }, []);
  function handelChat() {
    setCurrentChatWith(receiverId);
    setCurrentChatId(chatId);
    // console.log("chatting with ",receiverId," and chat ID is ",chatId);
  }
  async function handelRemoveChatList() {
    // console.log(crossRef.current);
    try {
      const docRef = doc(db, "chats", chatId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const bothUsers = [docSnap.data().user1, docSnap.data().user2];
        bothUsers.forEach(async (user) => {
          const userChatsRef = doc(db, "userChats", user);
          const userChatsSnap = await getDoc(userChatsRef);
          if (userChatsSnap.exists()) {
            const chatsArr = userChatsSnap.data().chats;
            const updatedChatsArr = chatsArr.filter(
              (item) => item.chatId !== chatId
            );
            await updateDoc(userChatsRef, { chats: updatedChatsArr });
          }
        });
      }
      await deleteDoc(docRef);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="ChatListCardContainer" onClick={handelChat}>
      <div className="chatListImageNusernameContainer">
        <div className="itemImgContainer">
          <img src={reUser.avatarUrl} alt="" />
        </div>
        <div className="text">
          <span>{reUser.username}</span>
          <p>This is last message</p>
        </div>
      </div>
      <div ref={crossRef} className="crossContainer">
        <IoRemoveCircle className="crossIcon" onClick={handelRemoveChatList} />
      </div>
    </div>
  );
}

export default ChatListCard;
