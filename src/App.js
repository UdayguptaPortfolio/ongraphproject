import React from 'react';
import './App.css';
import Forecast from "./Forecast";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        Weather-Finder App
        </header>
        <main>
          <Forecast/>
          </main>
          
    </div>
  );
}

export default App;
