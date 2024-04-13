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
    if (text.trim() != "") {
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
        
      } catch (err) {
        console.log(err);
      }
    }
  }

  function hadelEnter(e) {
    console.log(e.key);
    if (e.key == "Enter") {
      handelSendText();
    }
  }

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
              <p>Lorem ipsum dolor sit amet.</p>
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
          <div ref={chatCenterRef}></div>
        </div>
        <div className="chatBottom">
          <div className="leftIcons">
            <CiImageOn className="topReactIcons" />
            <IoCameraOutline className="topReactIcons" />
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
            <div className="emojieContainer">
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
