import React from "react";
import "./UserInfo.css";
import { IoIosVideocam } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";

function UserInfo() {
  return (
    <div className="userinfoContainer">
      <div className="user">
        <div className="userImgContainer">
          <img
            src="https://imgs.search.brave.com/7_EAqhx1XD9bh2yoP5E6bUMY_qGTy3qHa8QY9nzAt5c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlptTXpZMlkw/WlRNdE5HVXdNUzAw/WldRekxUa3hZekl0/T0dSaVpqWmpOakJt/TVRsa1hrRXlYa0Zx/Y0dkZVFYVnlOelUx/TnpFM05UZ0AuanBn"
            alt=""
          />
        </div>
        <h2>Subhajit Ghosh</h2>
      </div>
      <div className="icons">
        <IoIosVideocam  className="reactIcons"/>
        <IoIosCall  className="reactIcons"/>
        <FaRegEdit className="reactIcons" />
      </div>
    </div>
  );
}

export default UserInfo;
