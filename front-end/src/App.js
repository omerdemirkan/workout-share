import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/UI/navbar/navbar';
import Main from './components/UI/Main/Main';
import Footer from './components/UI/Footer/Footer'

// Axios for potentially fetching a token
import axios from './axios';

//Redux for storing token in global state
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/actionTypes';

// Routes
import All from './containers/Search/All/All'

import Create from './containers/create/Create';

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('authToken')) {
      //
    } else {
      axios.get('/users/create')
      .then(res => {
        console.log(res.data.accessToken);
      })
      .catch(err => {
        console.log(err);
      });
    }
  }
  render() {
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
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthToken: authToken => dispatch({type: actionTypes.SET_AUTH_TOKEN, authToken: authToken})
  }
}

export default connect(null, mapDispatchToProps)(App);
