import React from "react";
import './CSS/Loginsignup.css'
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const LoginSignUp=()=>{
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/Login');
    }

const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    async function submit(e){
        e.preventDefault();

        try{
            await axios.post("http://localhost:3001/login-signup",{
                email,password
            })

        }
        catch(e){
            console.log(e)
        }
    }
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>Sign up</h1>
<form action="POST" onSubmit={submit}>
                 <div className="loginsignup-fields">
                 <input type="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder="Email"></input>
                        <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
                        <button type="submit">Continue</button>
                     <br></br>
                     <text>Aldready having account Login</text>
                     <br></br>
                     <button onClick={handleLoginClick}>Login</button>
                 </div>
</form>
            </div>
        </div>
    )
}

export default LoginSignUp;


