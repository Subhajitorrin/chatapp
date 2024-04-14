import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { IoIosCall } from "react-icons/io";
import { IoIosVideocam } from "react-icons/io";
import { ImInfo } from "react-icons/im";
import { CiImageOn } from "react-icons/ci";
import { IoCameraOutline } from "react-icons/io5";
import { FaMicrophone } from "react-icons/fa6";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from "emoji-picker-react";
import Message from "./Message";
import getUserDetailsWithId from "../Firebase/getUserDetailsWithId";
import {
  doc,
  getDoc,
  collection,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { Timestamp } from "firebase/firestore";

function Chat({ currentChatWith, currentChatId, user, toggleNewChat }) {
  const [toggleEmojie, setToggleEmojie] = useState(false);
  const [text, setText] = useState("");
  const [chatWithUser, setChatWithUser] = useState([]);
  const [chat, setChat] = useState([]);
  const [isSeenOnChat, setIsSeenOnChat] = useState(false);
  const [isLastTextMine, setIsLastTextMine] = useState(false);
  const chatCenterRef = useRef(null);

  function handelEmojie(e) {
    // console.log(text);
    setText(text + e.emoji);
  }
  useEffect(() => {
    if (currentChatWith) {
      getUserDetailsWithId(currentChatWith).then((res) => {
        setChatWithUser(res);
      });
    }
  }, [currentChatWith]);

  async function handelSendText() {
    setIsSeenOnChat(false)
    if (text.trim() !== "") {
      setText("");
      const msg = {
        senderId: user.id,
        text: text,
        createdAt: Timestamp.now(),
      };
      try {
        await updateDoc(doc(db, "chats", currentChatId), {
          messages: arrayUnion(msg),
        });

        const bothUsers = [currentChatWith, user.id];
        bothUsers.forEach(async (id) => {
          const userChatsRef = doc(db, "userChats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);
          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex((ch) => {
              return ch.chatId === currentChatId;
            });
            userChatsData.chats[chatIndex].isSeen =
              id === user.id ? true : false;
            userChatsData.chats[chatIndex].updatedAt = Date.now();
            await updateDoc(userChatsRef, {
              chats: userChatsData.chats,
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  }

  function hadelEnter(e) {
    // console.log(e.key);
    if (e.key == "Enter") {
      handelSendText();
    }
  }

  useEffect(() => {
    if (currentChatWith) {
      const userChatsRef = doc(db, "userChats", currentChatWith);
      onSnapshot(userChatsRef, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          if (userData && userData.chats) {
            userData.chats.forEach((chat) => {
              if (currentChatId && chat.chatId === currentChatId) {
                setIsSeenOnChat(chat.isSeen);
              }
            });
          }
        }
      });
    }
  }, [currentChatWith]);

  useEffect(() => {
    if (currentChatId) {
      const chatRef = doc(db, "chats", currentChatId);
      const unsubscribe = onSnapshot(chatRef, (doc) => {
        if (doc.exists()) {
          setChat(doc.data().messages);
          setTimeout(() => {
            chatCenterRef.current.scrollIntoView({
              behavior: "smooth",
              block: "end",
            });
          }, 100);
          const arr = doc.data().messages;
          const tempLastText = arr[arr.length - 1];
          if (tempLastText && tempLastText.senderId === user.id) {
            setIsLastTextMine(true);
          } else {
            setIsLastTextMine(false);
          }
        } else {
          console.log("Chat document does not exist.");
        }
      });

      return () => unsubscribe();
    }
  }, [currentChatId]);

  function checkOwn(chat) {
    if (chat.senderId == user.id) {
      return true;
    } else {
      return false;
    }
  }

  // console.log(chat);
  if (currentChatId) {
    return (
      <div className="chatContainer">
        <div className="chatTop">
          <div className="topUserInfo">
            <div className="userInfoImg">
              <img src={chatWithUser.avatarUrl} alt="" />
            </div>
            <div className="userInfoText">
              <span>{chatWithUser.username}</span>
              {/* <p>Lorem ipsum dolor sit amet.</p> */}
            </div>
          </div>
          <div className="topIcons">
            <IoIosCall className="topReactIcons" />
            <IoIosVideocam className="topReactIcons" />
            <ImInfo className="topReactIcons" />
          </div>
        </div>
        <div className="chatCenter">
          {/* <Message isOwn={true} />
          <Message /> */}
          {chat.map((item, index) => {
            return checkOwn(item) ? (
              <Message key={index} isOwn={true} text={item.text} />
            ) : (
              <Message
                key={index}
                createdAt={item.createdAt}
                text={item.text}
                senderId={item.senderId}
              />
            );
          })}
          {isLastTextMine && isSeenOnChat && <div className="seen">seen</div>}
          <div ref={chatCenterRef}></div>
        </div>
        <div className="chatBottom">
          <div className="leftIcons">
            <CiImageOn className="topReactIcons" />
            <IoCameraOutline className="topReactIcons mobIcon" />
            <FaMicrophone className="topReactIcons" />
          </div>
          <input
            type="text"
            placeholder="Type your text here..."
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            onKeyDown={hadelEnter}
          />
          <div className="rightIcons">
            <div className="emojieContainer mobIcon">
              <MdOutlineEmojiEmotions
                className="topReactIcons emojieIcon"
                onClick={() => {
                  setToggleEmojie(!toggleEmojie);
                }}
              />
              <div className="reactEmojieContainer">
                {toggleEmojie && (
                  <EmojiPicker
                    className="emojieBox"
                    onEmojiClick={(e) => handelEmojie(e)}
                  />
                )}
              </div>
            </div>
            <IoMdSend className="topReactIcons" onClick={handelSendText} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="blnkContainer">
        <span>Find users and start conversation</span>
      </div>
    );
  }
}

export default Chat;
