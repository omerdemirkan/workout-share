import React from 'react';
import Feed from '../../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../../../containers/Inspect/Inspect';
import {connect} from 'react-redux';
import {loadPostsAsync} from '../../../store/actions/index'
import routeToType from '../../../helper/route-to-type';

import CircularProgress from '@material-ui/core/CircularProgress';

import axios from '../../../axios';
import * as actionTypes from '../../../store/actions/actionTypes';


class All extends React.Component {
    constructor(props) {
        super(props);
        window.scrollTo(0, 0)
    }

    state = {
        currentPath: this.props.history.location.pathname,
        search: this.props.location.search,
        searchID: null,

        // In order to enforce a re-render of the cards (without deleting them from our redux state) to complete the phase-in animation regardless
        // of the previous path. This is strictly for changing the path from / or all to other browse paths.
    }

    componentDidMount() {
        //Checking if this page has already been loaded and saved in redux
        if (this.props.history.search) {
            this.updateSearchHandler();
        }
        const loadedWorkouts = this.props[routeToType(this.props.history.location.pathname)];
        if (loadedWorkouts && loadedWorkouts.length === 0) {
            this.loadPostsHandler();
        }
    }

    componentDidUpdate() {

        const loadedWorkouts = this.props[routeToType(this.props.history.location.pathname)];

        if (loadedWorkouts.length === 0 && this.state.currentPath !== this.props.history.location.pathname) {
            this.loadPostsHandler();
            this.updatePathHandler();
        }
        

        if (this.state.search !== this.props.location.search) {
            this.updateSearchHandler();
        }
    }

    updatePathHandler = () => {
        this.setState({
            currentPath: this.props.history.location.pathname
        });
    }

    loadPostsHandler = () => {
        this.props.onLoadPosts(this.props.history.location.pathname, this.props[routeToType(this.props.history.location.pathname)].length);
    }

    updateSearchHandler = () => {
        const query = new URLSearchParams(this.props.location.search);
        let searchID = null
        for (let param of query.entries()) {
            searchID = param[1];
        }
        this.setState({
            searchID: searchID,
            search: this.props.location.search
        });
        if (searchID && searchID.length > 0) {
            axios.get('/workouts/' + searchID)
            .then(res => {
                console.log(res)
                this.props.onSetInspect(res.data, routeToType(this.props.history.location.pathname));
                this.setState({currentPath: this.props.history.location.pathname});
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    render() {
        console.log(this.state.display)
        
        const type = routeToType(this.props.history.location.pathname);
        const workouts = this.props[type];
        
        return <div style={{textAlign: 'center'}}>
            <Route path={this.props.history.location.pathname} exact component={Inspect}/>
            {workouts && !this.props.loading ?
                <Feed history={this.props.history} darkTitles workouts={workouts}/>
                
            : <CircularProgress style={{marginTop: '60px'}}/>}
            {this.props.error ? <p>{this.props.error}</p>: null}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        all: state.load.all,
        powerlifting: state.load.powerlifting,
        bodybuilding: state.load.bodybuilding,
        weightlifting: state.load.weightlifting,
        endurance: state.load.endurance,
        crossfit: state.load.crossfit,
        allInspect: state.inspect.all
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: (route, numPosts) => dispatch(loadPostsAsync(route, numPosts)),
        onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(All);