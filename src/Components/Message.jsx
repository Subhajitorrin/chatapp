import React, { useEffect, useState } from "react";
import "./Message.css";

function Message({ isOwn, createdAt, text, senderId }) {
  const calculateTimeDifference = (createdAt) => {
    const currentTime = new Date();
    const messageTime = new Date(createdAt);
    const difference = currentTime - messageTime;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} year${years > 1 ? "s" : ""} ago`;
    if (months > 0) return `${months} month${months > 1 ? "s" : ""} ago`;
    if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
  };
  const [timeDifference, setTimeDifference] = useState(
    calculateTimeDifference(createdAt)
  );
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(calculateTimeDifference(createdAt));
    }, 60000); // Update every minute (60 seconds * 1000 milliseconds)

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [createdAt]);

  return (
    <div className={`messageContainer ${isOwn ? "own" : ""}`}>
      <div className="msgtexts">
        <p>{text}</p>
        <span>{timeDifference}</span>
      </div>
    </div>
  );
}

export default Message;
