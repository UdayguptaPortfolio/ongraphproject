import React from 'react';
import './App.css';
import Forecast from './Forecast';
import Thirtyday from './Thirtyday';




function App() {
  return (
    <div className="App">
      <header className="App-header">
        Weather-Finder App
        </header>
        <main>
          <Forecast/>
          <Thirtyday/>
          </main>
          
    </div>
  );
}

export default App;
