import React, { useEffect, useRef, useState } from "react";
import "./LoginRegister.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import uploadImageToFirebaseAndGetURL from "../Firebase/uploadImage";

function LoginRegister() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const createBtnRef = useRef(null);
  const avatarRef = useRef(null);
  function handelAvatar(e) {
    const file = e.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (file && allowedTypes.includes(file.type)) {
      setAvatar({
        file: file,
        url: URL.createObjectURL(file),
      });
    } else {
      toast.warn("Please select a valid image file (JPEG, PNG, or GIF)");
    }
  }
  async function handelRegister(e) {
    e.preventDefault();
    const username = e.target.username.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.registerpassword.value.trim();
    if (avatar && username && email && password) {
      setIsLoading(true);
      const avatarLink = await uploadImageToFirebaseAndGetURL(avatar.file);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        console.log(res.user.uid);
        await setDoc(doc(db, "users", res.user.uid), {
          username,
          email,
          password,
          id: res.user.uid,
          avatarUrl: avatarLink,
          createdAt: new Date(),
          blocked: [],
        });
        await setDoc(doc(db, "userChats", res.user.uid), {
          chats: [],
        });
        toast.success("Account created succesfully. You can login now");
        setIsLoading(false);
        e.target.username.value = "";
        e.target.email.value = "";
        e.target.registerpassword.value = "";
        avatarRef.current.src =
          "https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg";
      } catch (err) {
        toast.warn("Email is already used");
      }
    } else {
      toast.warn("Please fill all the fields!");
    }
  }

  useEffect(() => {
    if (isLoading) {
      createBtnRef.current.disabled = true;
      createBtnRef.current.innerHTML = "Loading...";
      createBtnRef.current.style.backgroundColor = "#b8778c";
    } else {
      createBtnRef.current.disabled = false;
      createBtnRef.current.innerHTML = "Create an account";
      createBtnRef.current.style.backgroundColor = "#AC335C";
    }
  }, [isLoading]);

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
        <form onSubmit={handelRegister}>
          <div className="uploadContainer">
            <div className="imgContainerlogin">
              <img
                src={
                  avatar.url ||
                  "https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg"
                }
                ref={avatarRef}
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
            id="registeremail"
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="registerpassword"
            id="registerpassword"
            placeholder="Enter your password"
          />
          <button ref={createBtnRef}>Create an account</button>
        </form>
      </div>
    </div>
  );
}

export default LoginRegister;
