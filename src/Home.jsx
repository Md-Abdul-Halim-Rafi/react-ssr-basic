import React from "react";
import logo from "./assets/logo192.png";
// import { Link } from "react-router-dom"

function Home(props) {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <a className="App-link" href="/user/rafee">Rafee</a>
          <a className="App-link" href="/user/meemu">Meemu</a>
        </div>
      </header>
    </div>
  );
}

export default Home;
