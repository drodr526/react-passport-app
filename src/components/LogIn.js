import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BrowserRouter, Route, Link } from "react-router-dom";

function LogIn() {
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [userData, setUserData] = useState(null);
    let navigate = useNavigate();

    const register = () => {
        axios.post("http://localhost:4000/register",
            { username: registerUsername, password: registerPassword },
            { withCredentials: true })
            .then((res) => console.log(res))
    }
    const login = () => {
        axios.post("http://localhost:4000/login",
            { username: loginUsername, password: loginPassword },
            { withCredentials: true })
            .then((res) => console.log(res))
    }
    const getUser = () => {
        axios.get("http://localhost:4000/getuser",
            { withCredentials: true })
            .then((res) => setUserData(res.data));
    }
    const logout = () => {
        axios.get("http://localhost:4000/logout",
            { withCredentials: true })
            .then((res) => {
                console.log(res);
                setUserData(null);
            });
            window.location.reload(false);
    }

    return (
        <div className="App">
            <div>
                <h1>Register</h1>
                <input placeholder="username" onChange={event => setRegisterUsername(event.target.value)} value={registerUsername} />
                <input placeholder="password" onChange={event => setRegisterPassword(event.target.value)} value={registerPassword} />
                <button onClick={register}>Submit</button>
            </div>
            <div>
                <h1>Login</h1>
                <input placeholder="username" onChange={event => setLoginUsername(event.target.value)} value={loginUsername} />
                <input placeholder="password" onChange={event => setLoginPassword(event.target.value)} value={loginPassword} />
                <button onClick={login}>Submit</button>
            </div>
            <div>
                <h1>Get User</h1>
                <button onClick={getUser}>Submit</button>
                {userData ? <h1>{userData.username}</h1> : null}
                <button onClick={logout}>Log out</button>
            </div>

        </div>
    )
}

export default LogIn;