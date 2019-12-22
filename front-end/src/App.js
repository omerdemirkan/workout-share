import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Navbar from './components/UI/navbar/navbar';
import Footer from './components/UI/Footer/Footer'

// Axios for potentially fetching a token
import axios from './axios';

//Redux for storing token in global state
import {connect} from 'react-redux';
import * as actionTypes from './store/actions/actionTypes';

// Routes
import All from './containers/Search/All/All';
import Main from './components/UI/Main/Main';
import MyFavorites from './containers/MyFavorites/MyFavorites';
import MyWorkouts from './containers/MyWorkouts/MyWorkouts';
import Create from './containers/create/Create';

class App extends React.Component {
  componentDidMount() {

    //Authorization on mount (NO REDUX!, we don't need to set a loading state, this is meant to be in the background after mount)

    if (localStorage.getItem('authToken')) {
      this.props.onSetAuthToken(localStorage.getItem('authToken'));

      // Setting id's for liked posts. This is to ensure a max of one like per post per person.
      //These id's are used to determine the prior state of a card before load

      // axios.get('/users/likedID', {
      //   headers: {
      //     authorization: 'Bearer ' + localStorage.getItem('authToken')
      //   }
      // })
      // .then(res => {
      //   this.props.onSetLikedIDs(res.data)
      // })
      // .catch(err => {
      //   console.log(err);
      // });

    } else {

      //If there is no token in localstorage, a new token is fetched and likedID's are set to an empty array.

      this.props.onSetLikedIDs([]);
      axios.get('/users/create')
      .then(res => {
        localStorage.setItem('authToken', res.data.accessToken);
        this.props.onSetAuthToken(res.data.accessToken);
      })
      .catch(err => {
        console.log('eRROR in fetching /create authToken \n' + err);
      });
    }

  }

  render() {
    return <div className='App'>
      <Navbar/>
      <Main>
        <Switch>
          <Route path="/create" component={Create}/>
          <Route path='/my-favorites' component={MyFavorites}/>
          <Route path='/my-workouts' component={MyWorkouts}/>
          <Route path="/" component={All}/>
        </Switch>
      </Main>

      <Footer/>
    </div>
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSetAuthToken: authToken => dispatch({type: actionTypes.SET_AUTH_TOKEN, authToken: authToken}),
    onSetLikedIDs: likedIDs => dispatch({type: actionTypes.SET_LIKED_ID, likedIDs: likedIDs})
  }
}

export default connect(null, mapDispatchToProps)(App);
