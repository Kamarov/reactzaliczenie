import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Plansza from './Plansza';
import Czasomierz from './Czasomierz';

//Apka Reactowa by: Marcin Wykocki, czyli dlaczego omijam tego typu rozwiazania i jezyki beztypowe szerokim lukiem...
function App() {
  return (
    <body className="main">
      <Czasomierz/>
      <Plansza/>
    </body>
    /*
    
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
