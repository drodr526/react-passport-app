import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogIn from "./LogIn";

function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LogIn/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App;
