import React from 'react';
import axios from '../../../axios';
import Feed from '../../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../../../containers/Inspect/Inspect';
import {connect} from 'react-redux';
import {loadPostsAsync} from '../../../store/actions/index'
import routeToType from '../../../helper/route-to-type';
import * as actionTypes from '../../../store/actions/actionTypes'

import CircularProgress from '@material-ui/core/CircularProgress';

const getCurrentPathWithoutID = path => {
    return path.slice(0, path.lastIndexOf('/'))
}


class All extends React.Component {
    constructor(props) {
        super(props);
        window.scrollTo(0, 0)
    }

    state = {
        currentPath: '',
        search: null,
        searchID: null
    }

    componentDidMount() {
        this.updatePathHandler();
        this.updateSearchHandler();
    }

    componentDidUpdate() {
        if (this.state.currentPath !== this.props.history.location.pathname) {
            this.updatePathHandler();
        }
        if (this.props.location.search !== this.state.search) {
            this.updateSearchHandler();
        }
    }

    updatePathHandler = () => {
        this.setState({
            currentPath: this.props.history.location.pathname
        });
        this.props.onLoadPosts(this.props.history.location.pathname);
    }

    updateSearchHandler = () => {  
        console.log('updating search params');
        const query = new URLSearchParams(this.props.location.search);
        let searchID = null
        for (let param of query.entries()) {
            searchID = param[1];
        }
        this.setState({
            searchID: searchID,
            search: this.props.location.search
        });
    }

    render() {
        
        
        const type = routeToType(this.props.history.location.pathname);
        const workouts = this.props[type];
        
        return <div style={{textAlign: 'center'}}>
            {this.state.searchID ? 
                <Route path={this.props.history.location.pathname} exact render={() => <Inspect history={this.props.history} id={this.state.searchID}/>}/>
            : null}
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
        onLoadPosts: route => dispatch(loadPostsAsync(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(All);