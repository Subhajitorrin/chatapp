import React, { useEffect, useState } from "react";
import "./App.css";
import LoginRegister from "./Pages/LoginRegister";
import Home from "./Pages/Home";
import Notification from "./Components/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/firebase";
import getUserDetailsWithId from "./Firebase/getUserDetailsWithId";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [update,setUpdate] = useState(false);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserDetailsWithId(user.uid).then((res) => {
          setIsLogged(true);
          setUser(res);
          console.log(res);
        });
      } else {
        setIsLogged(false);
      }
    });
    return () => unsub();
  }, [update]);
  return (
    <div className="container">
      <div className="wrapper">
        {isLogged ? <Home user={user} setUpdate={setUpdate}/> : <LoginRegister />}
        <Notification />
      </div>
    </div>
  );
}

export default App;
