import React, { useEffect, useState } from "react";
import "./ChatListCard.css";
import getUserDetailsWithId from "../Firebase/getUserDetailsWithId";

function ChatListCard({ receiverId, lastMessage }) {
  const [reUser, setReUser] = useState([]);
  useEffect(() => {
    getUserDetailsWithId(receiverId).then((res) => {
      setReUser(res);
    });
  }, []);
  // console.log(reUser);
  return (
    <div className="ChatListCardContainer">
      <div className="itemImgContainer">
        <img src={reUser.avatarUrl} alt="" />
      </div>
      <div className="text">
        <span>{reUser.username}</span>
        <p>This is last message</p>
      </div>
    </div>
  );
}

export default ChatListCard;
