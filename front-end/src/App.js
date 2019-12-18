import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/UI/navbar/navbar';
import Main from './components/UI/Main/Main';
import Footer from './components/UI/Footer/Footer'

// Routes
import All from './containers/Search/All/All'

import Create from './containers/create/Create';

const App = props => {
  return <div className='App'>
    <Navbar/>
    <Main>
      
      <Switch>
        <Route path="/create" component={Create}/>
        
        <Route path="/" component={All}/>
      </Switch>
    </Main>
    <Footer/>

  </div>
}

export default App;
