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
  currentChatId,
  lastTextSender,
  avatarLink,
  username,
  lastMessage,
}) {
  const [reUser, setReUser] = useState([]);
  const [lsatMsg, setLastMsg] = useState({
    lastSender: "",
    lastText: "",
  });
  const crossRef = useRef(null);
  const sideUserRef = useRef(null);
  // useEffect(() => {
  //   getUserDetailsWithId(receiverId).then((res) => {
  //     setReUser(res);
  //   });
  // }, []);
  async function handelChat() {
    setCurrentChatWith(receiverId);
    setCurrentChatId(chatId);
    // update notification after clicking sidechat
    const userChatsRef = doc(db, "userChats", user.id);
    const userChatsSnapshot = await getDoc(userChatsRef);
    if (userChatsSnapshot.exists()) {
      const userChatsData = userChatsSnapshot.data();
      const chatIndex = userChatsData.chats.findIndex((ch) => {
        return ch.chatId === chatId;
      });
      userChatsData.chats[chatIndex].isSeen = true;
      // userChatsData.chats[chatIndex].updatedAt = Date.now();
      await updateDoc(userChatsRef, {
        chats: userChatsData.chats,
      });
    }
  }
  async function handelRemoveChatList(e) {
    // console.log(crossRef.current);
    e.stopPropagation();
    if (currentChatId == chatId) {
      setCurrentChatId(null);
      setCurrentChatWith(null);
    }
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

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
  //     if (doc.exists()) {
  //       const messages = doc.data().messages;
  //       if (messages.length > 0) {
  //         const lastMessage = messages[messages.length - 1];
  //         const obj = {
  //           lastSender: lastMessage.senderId,
  //           lastText: lastMessage.text,
  //         };
  //         setLastMsg(obj);
  //       }
  //     }
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [chatId]);

  async function makeChatSeen() {
    try {
      const userChatsRef = doc(db, "userChats", user.id);
      const userChatsSnapshot = await getDoc(userChatsRef);
      if (userChatsSnapshot.exists()) {
        const userChatsData = userChatsSnapshot.data();
        const chatIndex = userChatsData.chats.findIndex((ch) => {
          return ch.chatId === chatId;
        });
        userChatsData.chats[chatIndex].isSeen = true;
        userChatsData.chats[chatIndex].updatedAt = Date.now();
        await updateDoc(userChatsRef, {
          chats: userChatsData.chats,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (!currentChatId) {
      if (!isSeen) {
        sideUserRef.current.classList.add("gulabi");
      } else {
        sideUserRef.current.classList.remove("gulabi");
      }
    } else {
      if (currentChatId === chatId) {
        sideUserRef.current.classList.remove("gulabi");
        makeChatSeen();
      } else {
        if (!isSeen) {
          sideUserRef.current.classList.add("gulabi");
        } else {
          sideUserRef.current.classList.remove("gulabi");
        }
      }
    }
  }, [currentChatId, isSeen]);

  return (
    <div
      className="ChatListCardContainer "
      onClick={handelChat}
      ref={sideUserRef}
    >
      <div className="chatListImageNusernameContainer">
        <div className="itemImgContainer">
          <img src={avatarLink} alt="" />
        </div>
        <div className="text">
          <div className="username">
            <p>{username}</p>
          </div>
          {/* {lsatMsg.lastSender != "" ? (
            lsatMsg.lastSender === user.id ? (
              <p className="lasttext">
                <span className="you">You: </span> {lsatMsg.lastText}
              </p>
            ) : (
              <p className="lasttext">{lsatMsg.lastText}</p>
            )
          ) : (
            <span></span>
          )} */}
          {lastMessage != "" ? (
            lastTextSender === user.id ? (
              <p className="lasttext">
                <span className="you">You: </span> {lastMessage}
              </p>
            ) : (
              <p className="lasttext">{lastMessage}</p>
            )
          ) : (
            <span></span>
          )}
        </div>
      </div>
      <div className="crossContainer">
        <IoRemoveCircle
          className="crossIcon"
          onClick={handelRemoveChatList}
          ref={crossRef}
        />
      </div>
    </div>
  );
}

export default ChatListCard;
