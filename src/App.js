import React from 'react';
import './App.css';
import Signin from './Signin';
import {BrowserRouter, Route ,Routes } from "react-router-dom";
import Register from './Register';
import Home from './Home';
import DashBoard from './DashBoard';

function App() {
  return (
       <div>
        <BrowserRouter>
            <Routes>
            <Route exact path='/' element={<Home/>}/>
                <Route path ='/Signin' element = {<Signin/>} />
                <Route path ='/Register' element = {<Register/>} />
                <Route path='/DashBoard' element={<DashBoard/>}/>
                <Route path='/Home' element={<Home/>}/>
            </Routes>
        </BrowserRouter>

       </div>
  );
}
export default App;
