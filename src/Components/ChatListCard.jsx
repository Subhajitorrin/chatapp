import React, { useEffect, useRef, useState } from "react";
import "./ChatListCard.css";
import getUserDetailsWithId from "../Firebase/getUserDetailsWithId";
import { IoRemoveCircle } from "react-icons/io5";
import {
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { FaCircle } from "react-icons/fa";

function ChatListCard({
  receiverId,
  setCurrentChatWith,
  chatId,
  isSeen,
  setCurrentChatId,
  user,
}) {
  const [reUser, setReUser] = useState([]);
  const [lsatMsg, setLastMsg] = useState({
    lastSender: "",
    lastText: "",
  });
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

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
      const messages = doc.data().messages;
      if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        const obj = {
          lastSender: lastMessage.senderId,
          lastText: lastMessage.text,
        };
        setLastMsg(obj);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  return (
    <div className="ChatListCardContainer" onClick={handelChat}>
      <div className="chatListImageNusernameContainer">
        <div className="itemImgContainer">
          <img src={reUser.avatarUrl} alt="" />
        </div>
        <div className="text">
          <div className="username">
            <p>{reUser.username}</p>
            <FaCircle
              className="notiIcon"
              style={{ opacity: isSeen ? 0 : 1 }}
            />
          </div>
          {lsatMsg.lastSender != "" ? (
            lsatMsg.lastSender === user.id ? (
              <p>
                <span className="you">You: </span> {lsatMsg.lastText}
              </p>
            ) : (
              <p>{lsatMsg.lastText}</p>
            )
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div ref={crossRef} className="crossContainer">
        <IoRemoveCircle className="crossIcon" onClick={handelRemoveChatList} />
      </div>
    </div>
  );
}

export default ChatListCard;
