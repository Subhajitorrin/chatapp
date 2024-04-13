import React, { useEffect, useState } from "react";
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

function Chat({ currentChatWith }) {
  const [toggleEmojie, setToggleEmojie] = useState(false);
  const [text, setText] = useState("");
  const [chatWithUser, setChatWithUser] = useState([]);
  function handelEmojie(e) {
    console.log(text);
    setText(text + e.emoji);
  }
  useEffect(() => {
    if (currentChatWith) {
      getUserDetailsWithId(currentChatWith).then((res) => {
        setChatWithUser(res);
      });
    }
  }, [currentChatWith]);
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
        <Message isOwn={true} />
        <Message />
        <Message isOwn={true} />
        <Message />
        <Message />
        <Message isOwn={true} />
        <Message />
        <Message isOwn={true} />
        <Message />
        <Message />
        <Message isOwn={true} />
        <Message />
        <Message isOwn={true} />
        <Message isOwn={true} />
        <Message />
        <Message />
        <Message isOwn={true} />
        <Message />
        <Message />
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
          <IoMdSend className="topReactIcons" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
