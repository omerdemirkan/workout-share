import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/UI/navbar/navbar';
import Create from './containers/create/Create';
import Main from './components/UI/Main/Main';

// Search
import All from './containers/Search/All/All'
import Powerlifting from './containers/Search/Powerlifting/Powerlifting'
import Bodybuilding from './containers/Search/Bodybuilding/Bodybuilding'
import Weightlifting from './containers/Search/Weightlifting/Weightlifting'
import Endurance from './containers/Search/Endurance/Endurance'
import Crossfit from './containers/Search/Crossfit/Crossfit'

const App = props => {
  return <div className='App'>
    <Navbar/>
    <Main>
      <Switch>
        <Route path="/create" component={Create}/>

        <Route path="/powerlifting" component={Powerlifting}/>
        <Route path="/bodybuilding" component={Bodybuilding}/>
        <Route path="/weightlifting" component={Weightlifting}/>
        <Route path="/endurance" component={Endurance}/>
        <Route path="/crossfit" component={Crossfit}/>
        <Route path="/" component={All}/>
      </Switch>
    </Main>

  </div>
}

export default App;
