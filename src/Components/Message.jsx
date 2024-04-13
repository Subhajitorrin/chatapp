import React, { useEffect, useState } from "react";
import "./Message.css";

function Message({ isOwn, createdAt, text, senderId }) {
  // Function to calculate time difference
  const calculateTimeDifference = (firebaseTime) => {
    if (!firebaseTime) return "Just now"; // Return empty string if firebaseTime is undefined or null

    // Convert Firebase timestamp to JavaScript Date object
    const messageTime = new Date(firebaseTime.seconds * 1000);
    const currentTime = new Date();

    // Calculate difference in milliseconds
    const difference = currentTime - messageTime;

    const seconds = Math.abs(Math.floor(difference / 1000));
    const minutes = Math.abs(Math.floor(seconds / 60));
    const hours = Math.abs(Math.floor(minutes / 60));
    const days = Math.abs(Math.floor(hours / 24));
    const months = Math.abs(Math.floor(days / 30));
    const years = Math.abs(Math.floor(months / 12));

    if (seconds < 60) {
      return "Just now";
    } else if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} sec${seconds > 1 ? "s" : ""} ago`;
    }
  };

  // State for time difference
  const [timeDifference, setTimeDifference] = useState(
    calculateTimeDifference(createdAt)
  );

  // Effect to update time difference every minute
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeDifference(calculateTimeDifference(createdAt));
    }, 60000); // Update every minute (60 seconds * 1000 milliseconds)

    // Clean up interval
    return () => clearInterval(intervalId);
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
