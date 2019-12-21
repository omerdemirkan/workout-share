import React from 'react';
import {connect} from 'react-redux';
import routeToType from '../../helper/route-to-type';
import * as actionTypes from '../../store/actions/actionTypes';
import {loadPostsAsync} from '../../store/actions/index'
import classes from './MyFavorites.module.css';
import axios from '../../axios';
import Feed from '../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../Inspect/Inspect'

class MyFavorites extends React.Component {

    componentDidMount() {
        this.props.onLoadPosts('/my-favorites');
    }

    render() {
        return <div className={classes.MyFavorites}>
            <Route path={this.props.history.location.pathname} exact component={Inspect}/>
            <h1 className={classes.Header}>My Favorites</h1>
            {this.props.myFavorites.length > 0 ?
                <Feed favorites={this.props.likedIDs} history={this.props.history} darkTitles workouts={this.props.myFavorites}/>
            : null}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        myFavorites: state.load.myFavorites,
        likedIDs: state.auth.likedIDs
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: route => dispatch(loadPostsAsync(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);