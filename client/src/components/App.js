import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";


function App(props) {

  const [sessionData, setSessionData] = useState(null);

  function getSession() {
    axios.get("/api/getuser",
      { withCredentials: true })
      .then((res) => props.setSessionData(res.data));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} getSession={getSession} sessionData={sessionData} setSessionData={setSessionData}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
