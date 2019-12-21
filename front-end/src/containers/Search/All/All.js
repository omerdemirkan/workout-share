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
        currentPath: '',
        search: null,
        searchID: null,
        type: null
    }

    componentDidMount() {
        //Checking if this page has already been loaded and saved in redux
        const loadedWorkouts = this.props[routeToType(this.props.history.location.pathname)];
        if (loadedWorkouts && loadedWorkouts.length === 0) {
            this.updatePathHandler();
            this.updateSearchHandler();
        }
    }

    componentDidUpdate() {
        const loadedWorkouts = this.props[routeToType(this.props.history.location.pathname)];
        if (loadedWorkouts) {
            if (this.state.currentPath !== this.props.history.location.pathname && loadedWorkouts.length === 0) {
                this.updatePathHandler();
            }

            //Not updating search on update because I want it to be handled by the Card component on title click after the initial load.
            //This is because the initial load is the only way to inspect a post without having actively clicked on a post.

            // if (this.props.location.search !== this.state.search) {
            //     this.updateSearchHandler();
            // }
        }
    }

    updatePathHandler = () => {
        this.setState({
            currentPath: this.props.history.location.pathname,
            type: routeToType(this.props.history.location.pathname)
        });
        this.props.onLoadPosts(this.props.history.location.pathname);
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
                this.props.onSetInspect(res.data, routeToType(this.props.history.location.pathname));
            })
            .catch(err => {
                console.log(err)
            });
        }
    }

    render() {
        
        
        const type = routeToType(this.props.history.location.pathname);
        const workouts = this.props[type];
        
        return <div style={{textAlign: 'center'}}>
            <Route path={this.props.history.location.pathname} exact component={Inspect}/>
            {workouts && !this.props.loading ? 
            <React.Fragment>
                <Feed history={this.props.history} darkTitles workouts={workouts}/>
            </React.Fragment>
                
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
        error: state.load.error,
        state: state.load,
        loading: state.load.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: route => dispatch(loadPostsAsync(route)),
        onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(All);