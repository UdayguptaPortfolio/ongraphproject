import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function Signin(){

    const[username,setUserName]=useState('')
    const[password,setPassword]=useState('')

    const[loginStatus,setLoginStatus]=useState('')

const login=()=>{
    Axios.post('http://localhost:4000/app/login',{
        UserName:username,
        Password:password,
    }).then((res)=>{
        console.log(res)
        if(res.data.message)
        {
            console.log(res)
            setLoginStatus(res.data.message)
        }else{
setLoginStatus(res.data[0])
        }
    });
};
    return (
        <div className='App'>
            <div className="Login">
                <h1>Login</h1>
                <input type="text" placeholder="Enter your Username...."  onChange={(event)=>{setUserName(event.target.value)}}/>
                <input type="password" placeholder="Enter your password...." onChange={(event)=>{setPassword(event.target.value)}}/>
                <br/><br/><br/><button onClick={login}>Login Here</button>
                {loginStatus}
            </div>
            </div>
    )
}

export default Signin;