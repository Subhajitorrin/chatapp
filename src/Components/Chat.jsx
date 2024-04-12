import React, { useState } from "react";
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

function Chat() {
  const [toggleEmojie, setToggleEmojie] = useState(false);
  const [text, setText] = useState("");
  function handelEmojie(e) {
    console.log(text);
    setText(text + e.emoji);
  }
  return (
    <div className="chatContainer">
      <div className="chatTop">
        <div className="topUserInfo">
          <div className="userInfoImg">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3twOSZJs7lNZa0V0sU3xOWz_zMUVn7k-bXMzYnfrJJw&s"
              alt=""
            />
          </div>
          <div className="userInfoText">
            <span>Subhajit Ghosh</span>
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="topIcons">
          <IoIosCall className="topReactIcons" />
          <IoIosVideocam className="topReactIcons" />
          <ImInfo className="topReactIcons" />
        </div>
      </div>
      <div className="chatCenter"></div>
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
