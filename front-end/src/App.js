import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css'

import Navbar from './components/UI/navbar/navbar';
import Feed from './containers/feed/Feed';
import Create from './containers/create/Create'

class App extends React.Component {

  render() { 
    return (
      <div className='App'>
        <Navbar/>
        <Switch>
          <Route path="/create" component={Create}/>
          <Route path="/" component={Feed}/>
        </Switch>
      </div>
    );
  }
}

export default App;
