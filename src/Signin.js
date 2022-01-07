import React, { useState } from "react";
import Axios from "axios";
import "./App.css";
import { useNavigate,Link } from 'react-router-dom';

function Signin(){
    const navigate = useNavigate();
    const[username,setUserName]=useState('')
    const[password,setPassword]=useState('')
    const[email,setEmail]=useState('')
    const[loginStatus,setLoginStatus]=useState('')
    const headers={"Access-Control-Allow-Headers": "*"}

const login=()=>{
    Axios.post('https://weather-backend-app.herokuapp.com/app/login', {headers:headers},{
        UserName:username,
        email:email,
        Password:password,
    }).then((res)=>{
        console.log(res)
        if(res.data.message)
        {
            //console.log(res)
            localStorage.setItem("email",email);
            setLoginStatus(res.data.message)
            if(res.data.status==='ok')
            {
                navigate('/DashBoard');
            }else{
                setLoginStatus(res.data.message)   
            }
                
        }
        else{
            setLoginStatus('All Fields are Mandatory!!!')
        }
    });
};
    return (
        <div className='App'>
      <header className="App-header">
       <h2 className='header-signin'> Weather-Finder App</h2> 
        <button className='button-header-signin'><b><Link to='/Register'>Register Yourself</Link></b></button>
        </header>
            <div className="Login">
                <h1>Login</h1>
                <input type="text" placeholder="Enter your Username...."  onChange={(event)=>{setUserName(event.target.value)}}/>
                <input type="email" placeholder="Enter your Email...."  onChange={(event)=>{setEmail(event.target.value)}}/>
                <input type="password" placeholder="Enter your password...." onChange={(event)=>{setPassword(event.target.value)}}/>
                <br/><br/><br/><br/><br/><br/><br/><button onClick={login}>Login Here</button>
                {loginStatus}
            </div>
            </div>
    )
}

export default Signin;