import React, { useEffect, useRef, useState } from "react";
import "./UserInfo.css";
import { IoIosVideocam } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserInfo({ user }) {
  const [toggleEdit, setToggleEdit] = useState(false);
  const updateRef = useRef(null)
  function handelEditBtn(){
    if(updateRef.current.classList.contains("updateActive")){
      updateRef.current.classList.remove("updateActive")
    }else{
      updateRef.current.classList.add("updateActive")
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
          <FaRegEdit
            className="reactIcons"
            onClick={handelEditBtn}
          />
          <div className="editProfileContainer updateActive" ref={updateRef}>
            <div className="updateImgContainer">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVCe_lWmhlCdO7BloszzyO1iPjApWMgitzkuB5ezk3Ig&s"
                alt=""
              />
            </div>
            <label htmlFor="editavatar">Upload your avatar</label>
            <input
              type="file"
              name="editavatar"
              id="editavatar"
              style={{ display: "none" }}
            />
            <input
              type="text"
              name=""
              id=""
              placeholder="Enter your new username"
            />
            <button>Update profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
