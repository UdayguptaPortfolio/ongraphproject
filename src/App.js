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
          <Route exact path='/' element={<Homepage/>}/>
        </Routes>
            <Routes>
                <Route path ='/Signin' element = {<Signin/>} />
                <Route path ='/Register' element = {<Register/>} />
            </Routes>
        </BrowserRouter>

       </div>
  );
}
export default App;
