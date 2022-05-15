import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

function LogIn(props) {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [sessionData, setSessionData] = useState(null);
    
    let navigate = useNavigate();

    const register = () => {
        axios.post("/api/register",
            { username: registerUsername, password: registerPassword },
            { withCredentials: true })
            .then((res) => console.log(res))
    }
    const login = () => {
        axios.post("/api/login",
            { username: loginUsername, password: loginPassword },
            { withCredentials: true })
            .then((res) => console.log(res))
    }
    const logout = () => {
        axios.get("/api/logout",
            { withCredentials: true })
            .then((res) => {
                console.log(res);
                setSessionData(null)
            });
            window.location.reload(false);
    }
    const getSession = () =>{
        axios.get("/api/session",
        {withCredentials:true})
        .then((res)=>setSessionData(res.data))
    }

    return (
        <div className="App">
            <div>
                <h1>Register</h1>
                <input placeholder="username" onChange={event => setRegisterUsername(event.target.value)} value={registerUsername} />
                <input type="password" placeholder="password" onChange={event => setRegisterPassword(event.target.value)} value={registerPassword} />
                <button onClick={register}>Submit</button>
            </div>
            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={event => setLoginUsername(event.target.value)} value={loginUsername} />
                <input type="password" placeholder="password" onChange={event => setLoginPassword(event.target.value)} value={loginPassword} />
                <button onClick={login}>Submit</button>
            </div>
            <div>
                <h1>Get Session</h1>
                <button onClick={getSession}>Submit</button>
                {sessionData ? <h1>{sessionData.username}</h1> : null}
                <button onClick={logout}>Log out</button>
            </div>

        </div>
    )
}

export default LogIn;