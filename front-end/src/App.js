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

    //Authorization on mount (NO REDUX!, we don't need to set a loading state, this is meant to be in the background after mount)

    if (localStorage.getItem('authToken')) {
      this.props.onSetAuthToken(localStorage.getItem('authToken'));

      // Setting id's for liked posts

      axios.get('/users/likedID', {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('authToken')
        } 
      })
      .then(res => {
        this.props.onSetLikedID(res.data)
      })
      .catch(err => {
        console.log(err);
      });

    } else {
      axios.get('/users/create')
      .then(res => {
        localStorage.setItem('authToken', res.data.accessToken);
        this.props.onSetAuthToken(res.data.accessToken);
      })
      .catch(err => {
        console.log('eRROR in fetching /create authToken \n' + err);
      });
      this.props.onSetLikedID([])
      this.props.onSetPostedID([])
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

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthToken: authToken => dispatch({type: actionTypes.SET_AUTH_TOKEN, authToken: authToken}),
    onSetLikedID: likedIDs => dispatch({type: actionTypes.SET_LIKED_ID, likedIDs: likedIDs})
  }
}

export default connect(null, mapDispatchToProps)(App);
