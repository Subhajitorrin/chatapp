import React from "react";
import "./UserInfo.css";
import { IoIosVideocam } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function UserInfo({ user }) {
  return (
    <div className="userinfoContainer">
      <div className="user">
        <div className="userImgContainer">
          <img
            src={user ? user.avatarUrl : <Skeleton width={40} height={40} circle={true}/>}
            alt=""
          />
        </div>
        <h2>{user ? user.username : <Skeleton width={170} height={5} />}</h2>
      </div>
      <div className="icons">
        <IoIosVideocam className="reactIcons" />
        <IoIosCall className="reactIcons" />
        <FaRegEdit className="reactIcons" />
      </div>
    </div>
  );
}

export default UserInfo;
