import React, { useEffect, useRef, useState } from "react";
import "./LoginRegister.css";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
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
  const avatarRef = useRef(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isLoginPageMobile, SetIsLoginPageMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
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
    if (avatar.file != null && username && email && password) {
      setIsLoading(true);
      const avatarLink = await uploadImageToFirebaseAndGetURL(avatar.file);
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created succesfully & logged in");
        // console.log(res.user.uid);
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
        // e.target.username.value = "";
        // e.target.email.value = "";
        // e.target.registerpassword.value = "";
        // avatarRef.current.src =
        //   "https://as1.ftcdn.net/v2/jpg/02/59/39/46/1000_F_259394679_GGA8JJAEkukYJL9XXFH2JoC3nMguBPNH.jpg";
        // setAvatar({
        //   file: null,
        //   url: "",
        // });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn("Please fill all the fields!");
    }
  }

  // handel login
  async function handelLogin(e) {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    if (email && password) {
      setIsLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login succesfull");
      } catch (err) {
        toast.warn("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.warn("Fill the fields!");
    }
  }

  if (isMobileView) {
    return (
      <div className="login-register-container">
        {isLoginPageMobile ? (
          <div className="item mobileView">
            <h2>Login Here</h2>
            <form onSubmit={handelLogin}>
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
              <button
                disabled={isLoading}
                style={{
                  backgroundColor: `${isLoading ? "#b8778c" : "#AC335C"}`,
                }}
              >
                {isLoading ? "Loading..." : "Sign in"}
              </button>
              <p style={{ fontSize: ".9rem" }}>
                Don't have an account ?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => SetIsLoginPageMobile((prev) => !prev)}
                >
                  Register here
                </span>
              </p>
            </form>
          </div>
        ) : (
          <div className="item mobileView">
            <h2>Create an account</h2>
            <form onSubmit={handelRegister}>
              <div className="uploadContainer">
                <div className="imgContainerlogin">
                  <img src={avatar.url || ""} ref={avatarRef} />
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
              <button
                style={{
                  backgroundColor: `${isLoading ? "#b8778c" : "#AC335C"}`,
                }}
              >
                {isLoading ? "Loading..." : "Create an account"}
              </button>
              <p style={{ fontSize: ".9rem" }}>
                Already have an account ?{" "}
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => SetIsLoginPageMobile((prev) => !prev)}
                >
                  Login here
                </span>
              </p>
            </form>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div className="login-register-container">
        <div className="item">
          <h2>Login Here</h2>
          <form onSubmit={handelLogin}>
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
            <button
              disabled={isLoading}
              style={{
                backgroundColor: `${isLoading ? "#b8778c" : "#AC335C"}`,
              }}
            >
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </form>
        </div>
        <div className="seperator"></div>
        <div className="item">
          <h2>Create an account</h2>
          <form onSubmit={handelRegister}>
            <div className="uploadContainer">
              <div className="imgContainerlogin">
                <img src={avatar.url || ""} ref={avatarRef} />
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
            <button
              style={{
                backgroundColor: `${isLoading ? "#b8778c" : "#AC335C"}`,
              }}
            >
              {isLoading ? "Loading..." : "Create an account"}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default LoginRegister;
