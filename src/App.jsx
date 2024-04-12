import React from "react";
import "./App.css";
import LoginRegister from "./Pages/LoginRegister";
import Home from "./Pages/Home";

function App() {
  return (
    <div className="container">
      <div className="wrapper">
        {/* <LoginRegister /> */}
        <Home/>
      </div>
    </div>
  );
}

export default App;
