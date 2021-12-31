import React from 'react';
import './App.css';
import Signin from './Signin';
import {BrowserRouter, Route ,Routes } from "react-router-dom";
import Homepage from './Homepage';
import Register from './Register';

function App() {
  return (
       <div>
{/* <Homepage/> */}
        <BrowserRouter>
            <Routes>
            <Route exact path='/' element={<Signin/>}/>
                <Route path ='/Signin' element = {<Signin/>} />
                <Route path ='/Register' element = {<Register/>} />
                <Route path='/Homepage' element={<Homepage/>}/>
            </Routes>
        </BrowserRouter>

       </div>
  );
}
export default App;
