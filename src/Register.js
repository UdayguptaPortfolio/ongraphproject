import React, { useState } from "react";
import Axios from "axios";
import "./App.css";

function Register(){
    const[usernameReg,setUserNameReg]=useState('')
    const[passwordReg,setPasswordReg]=useState('')
    const[registerstatus,setRegisterStatus]=useState('')

    const register=()=>{
        Axios.post('http://localhost:4000/app/signup',{
            UserName:usernameReg,
            Password:passwordReg,
        }).then((res)=>{
            if(res.data)
            {
                setRegisterStatus(res.data.UserName+'Registered Successfully')
            }
            console.log(res)
        });
    };
    return(
        <div className="App">
        <div className="registration">
        <h1>Registration</h1>
        <input type="text" placeholder="Username" onChange={(event)=>{setUserNameReg(event.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(event)=>{setPasswordReg(event.target.value)}}/>
        <br/><br/><br/><button onClick={register}>Register</button> {registerstatus} 
        </div>
        </div>
    )
}

export default Register;