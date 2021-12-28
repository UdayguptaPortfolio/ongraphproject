import React, { useState } from "react";
import Axios from "axios";
import "./App.css";


function Signin(){
    const[usernameReg,setUserNameReg]=useState('')
    const[passwordReg,setPasswordReg]=useState('')

const register=()=>{
    Axios.post('http://localhost:4000/app/signup',{
        UserName:usernameReg,
        Password:passwordReg,
    }).then((res)=>{
        console.log(res)
    });
};

    return (
        <div className="">
            <div className="registration">
            <h1>Registration</h1>
            <input type="text" placeholder="Username" onChange={(event)=>{setUserNameReg(event.target.value)}}/>
                <input type="password" placeholder="Password" onChange={(event)=>{setPasswordReg(event.target.value)}}/>
            <button onClick={register}>Register</button>    

            </div>
            <div className="Login">
                <h1>Login</h1>
                <input type="text" placeholder="Enter your Username...."/>
                <input type="password" placeholder="Enter your password...."/>
                <button>SignIn</button>
            </div>
        </div>
    )
}

export default Signin;