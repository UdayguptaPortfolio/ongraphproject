import React from "react";
import { Link } from "react-router-dom";

function Home()
{
return (
    <div className="App-home">
    <header className="App-header">
     <h2 className='header-home'> Weather-Finder App</h2> 
      </header><div className="home-pic"><img src='rain.png' alt="rain pic" className="rain-pic"/>
      <img src='night.png' alt="rain pic" className="rain-pic"/>
      <img src="cloud.png" className="rain-pic"/>
      <img src="cloudlightning.png" className="rain-pic"/>
      <img src="partly-cloudy-day.png" className="rain-pic"/>
      <img src="moon.png" className="rain-pic"/></div>
      <h1 className="home-content">Hello,Welcome!!!</h1>
      <h2 className="instructions">If You Are An Existing User then Please Click On Login....<br/>
      Otherwise Please Register Yourself By Clicking on Register Button</h2>
      <button className='button-home'><b><Link to='/Signin'>Login</Link></b></button>
      <button className='button-home2'><b><Link to='/Register'>Register</Link></b></button>
    </div>
)
}

export default Home;