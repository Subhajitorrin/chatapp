import React from "react";
import "./Details.css";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { toast } from "react-toastify";
function Details() {
  function handelSignout() {
    signOut(auth).then(() => {
      toast.success("Sign out succesful");
    });
  }
  return (
    <div className="detailsContainer">
      <button onClick={handelSignout}>Sign out</button>
    </div>
  );
}

export default Details;
