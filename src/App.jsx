import React from "react";
import "./App.css";
import LoginRegister from "./Pages/LoginRegister";
import Home from "./Pages/Home";
import Notification from "./Components/Notification";

function App() {
  return (
    <div className="container">
      <div className="wrapper">
        <LoginRegister />
        {/* <Home/> */}
        <Notification />
      </div>
    </div>
  );
}

export default App;
