import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'

import Navbar from './components/UI/navbar/navbar';
import Feed from './containers/feed/Feed';

class App extends React.Component {

  render() { 
    return (
      <div className='App'>
        <Navbar/>
        <Switch>
          <Route path="/about"/>
          <Route path="/" component={Feed}/>
        </Switch>
      </div>
    );
  }
}

export default App;
