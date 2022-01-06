import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { Link } from "react-router-dom";

function Register(){
    const[usernameReg,setUserNameReg]=useState('')
    const[passwordReg,setPasswordReg]=useState('')
    const[registerstatus,setRegisterStatus]=useState('')
    const[emailReg,setEmailReg]=useState('')

    const register=()=>{
        Axios.post('https://weather-backend-app.herokuapp.com/app/signup',{
            UserName:usernameReg,
            email:emailReg,
            Password:passwordReg,
        }).then((res)=>{
            if(res.data)
            {
                setRegisterStatus(res.data.message)
            }
            console.log(res)
        });
    };
    return(
        <div className="App">
        <div className="registration">
        <h1>Registration</h1>
        <input type="text" placeholder="Username" onChange={(event)=>{setUserNameReg(event.target.value)}}/>
        <input type="email" placeholder="Email" onChange={(event)=>{setEmailReg(event.target.value)}}/>
            <input type="password" placeholder="Password" onChange={(event)=>{setPasswordReg(event.target.value)}}/>
        <br/><br/><br/><br/><br/><br/><br/><button onClick={register}>Register</button>{registerstatus} 
        <button className='button-login'><b><Link to='/Signin'>Login</Link></b></button> 
        </div>
        </div>
    )
}

export default Register;