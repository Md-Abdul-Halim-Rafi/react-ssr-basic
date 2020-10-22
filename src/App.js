import React from "react";
import Home from "./Home"
import UserPage from "./UserPage"
import NotFound from "./404"

import "./App.css";


import { Switch, Route } from "react-router-dom"

function App() {
  
  return (
        <Switch> 
        <Route path="/" exact component={Home} />
        <Route path="/user/:name" exact component={UserPage} />
        <Route  component={NotFound} />
      </Switch>
  );
}

export default App;
