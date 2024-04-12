import React, { useEffect, useRef, useState } from "react";
import "./UserInfo.css";
import { IoIosVideocam } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";
import uploadImageToFirebaseAndGetURL from "../Firebase/uploadImage";
import { db } from "../Firebase/firebase";

function UserInfo({ user, setUpdate }) {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [text, setText] = useState("");
  const updateRef = useRef(null);
  const avatarRef = useRef(null);
  function handelEditBtn() {
    if (updateRef.current.classList.contains("updateActive")) {
      updateRef.current.classList.remove("updateActive");
    } else {
      updateRef.current.classList.add("updateActive");
    }
  }

  function handelAvatar(e) {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && allowedTypes.includes(file.type)) {
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });
      avatarRef.current.src = URL.createObjectURL(file);
    } else {
      toast.warn("Please select a valid image file (JPEG, PNG, or GIF)");
    }
  }

  async function handelUpdate() {
    handelEditBtn();
    try {
      if (text.trim() != "") {
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          username: text,
        });
        setText("");
        toast.success("Username updated succesfully");
      }
      if (avatar.file != null) {
        const avatarLink = await uploadImageToFirebaseAndGetURL(avatar.file);
        const userRef = doc(db, "users", user.id);
        await updateDoc(userRef, {
          avatarUrl: avatarLink,
        });
        toast.success("Profile photo updated succesfully");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setUpdate((prev) => !prev);
    }
  }

  return (
    <div className="userinfoContainer">
      <div className="user">
        <div className="userImgContainer">
          <img
            src={
              user ? (
                user.avatarUrl
              ) : (
                <Skeleton width={40} height={40} circle={true} />
              )
            }
            alt=""
          />
        </div>
        <h2>{user ? user.username : <Skeleton width={170} height={5} />}</h2>
      </div>
      <div className="icons">
        <IoIosVideocam className="reactIcons" />
        <IoIosCall className="reactIcons" />
        <div className="editContainer">
          <FaRegEdit className="reactIcons" onClick={handelEditBtn} />
          <div className="editProfileContainer updateActive" ref={updateRef}>
            <div className="updateImgContainer">
              {user ? (
                <img src={user.avatarUrl} alt="" ref={avatarRef} />
              ) : (
                <Skeleton width={200} height={3} count={7} />
              )}
            </div>
            <label htmlFor="editavatar">Upload your avatar</label>
            <input
              type="file"
              name="editavatar"
              id="editavatar"
              style={{ display: "none" }}
              onChange={(e) => handelAvatar(e)}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your new username"
              onChange={(e) => {
                setText(e.target.value);
              }}
              value={text}
            />
            <button onClick={handelUpdate}>Update profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
