import React from 'react';
import { Route, Switch } from 'react-router-dom'

import Navbar from './components/UI/navbar/navbar'

import All from './containers/feed/all'

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Switch>
        <Route path="/" component={All}/>
        <Route path="/about"/>
      </Switch>
    </div>
  );
}

export default App;
