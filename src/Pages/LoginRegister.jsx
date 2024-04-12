// LoginRegister.js
import React, { useState } from "react";
import "./LoginRegister.css";

function LoginRegister() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  function handelAvatar(e) {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }
  return (
    <div className="login-register-container">
      <div className="item">
        <h2>Login Here</h2>
        <form action="">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <button>Sign in</button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an account</h2>
        <form action="">
          <div className="uploadContainer">
            <div className="imgContainerlogin">
              <img
                src={
                  avatar.url ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjz73Qfzp2C1E_75YyUAGxMEltKpxd5b29GqiWxdzO3A&s"
                }
                alt=""
              />
            </div>
            <label htmlFor="file">Upload an image</label>
            <input
              type="file"
              name="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => handelAvatar(e)}
            />
          </div>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter an unique username"
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <button>Create an account</button>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
