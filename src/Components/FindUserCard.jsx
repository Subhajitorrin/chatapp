import React from "react";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../Firebase/firebase";
import { toast } from "react-toastify";

function FindUserCard({
  image,
  name,
  id,
  currUser,
  setToggle,
  handelFindUser,
  setFindUser,
  setFindUsersList
}) {
  async function checkIfAlreadyChatListIsPresent() {
    try {
      const chatsCollectionRef = collection(db, "chats");
      const querySnapshot = await getDocs(chatsCollectionRef);
      const isPresent = querySnapshot.docs.find((doc) => {
        const user1 = doc.data().user1;
        const user2 = doc.data().user2;
        return (
          (id === user1 && currUser.id === user2) ||
          (id === user2 && currUser.id === user1)
        );
      });
      if (isPresent) {
        toast.warn("User is already present");
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
    }
  }

  async function handelAddUserToChatList() {
    const isPresent = await checkIfAlreadyChatListIsPresent();
    if (isPresent) return;
    toast.success("User added to chat list");
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");
    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        user1: currUser.id,
        user2: id,
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
      // console.log(newChatRef.id);
    } catch (err) {
      console.log(err);
    }
  }
  function handelFindListClose() {
    setToggle((prev) => !prev);
    handelFindUser();
    setFindUser("");
    setFindUsersList([])
  }
  return (
    <div className="user">
      <div className="searchImgAndusernameContainer">
        <div className="userimgcontainer">
          <img src={image ? image : ""} alt="" />
        </div>
        <h4>{name}</h4>
      </div>
      <button
        onClick={() => {
          handelAddUserToChatList();
          handelFindListClose();
        }}
      >
        Add
      </button>
    </div>
  );
}

export default FindUserCard;
