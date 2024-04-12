import React from "react";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";

function FindUserCard({ image, name, id, currUser }) {
  async function handelAddUserToChatList() {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: new Date(),
        messages: [],
      });
      await updateDoc(doc(userChatsRef, id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currUser.id,
        }),
      });
      await updateDoc(doc(userChatsRef, currUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: id,
        }),
      });
      console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="user">
      <div className="searchImgAndusernameContainer">
        <div className="userimgcontainer">
          <img src={image} alt="" />
        </div>
        <h4>{name}</h4>
      </div>
      <button onClick={handelAddUserToChatList}>Add</button>
    </div>
  );
}

export default FindUserCard;
