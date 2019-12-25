import React from 'react';
import {connect} from 'react-redux';
import {loadPostsAsync} from '../../store/actions/index'
import classes from './MyWorkouts.module.css';
import Feed from '../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../Inspect/Inspect'
import empty2 from '../../images/empty2.svg';
import axios from '../../axios';
import routeToType from '../../helper/route-to-type';
import * as actionTypes from '../../store/actions/actionTypes';


class MyWorkouts extends React.Component {

    state = {
        search: null,
        searchID: null,
        numWorkouts: null
    }

    componentDidMount() {
        this.props.onLoadPosts('/my-workouts');
        if (this.props.history.location.search.length > 0) {
            this.checkSearchHandler();
        }
    }

    componentDidUpdate() {
        if (this.state.search !== this.props.history.location.search) {
            console.log('rechecking search');
            this.checkSearchHandler();
        }

        // if (this.props.myWorkouts.posts && this.state.numWorkouts !== this.props.myWorkouts.posts.length) {
        //     this.setState({

        //     });
        // }
    }

    checkSearchHandler = () => {
        const query = new URLSearchParams(this.props.location.search);
        let searchID = null
        for (let param of query.entries()) {
            searchID = param[1];
        }
        this.setState({
            searchID: searchID,
            search: this.props.history.location.search
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
        return <React.Fragment>
            <Route path={this.props.history.location.pathname} exact component={Inspect}/>  
            <div className={classes.MyWorkouts}>
                <h1 className={classes.Header}>My Workouts</h1>
                {this.props.myWorkouts.posts.length > 0 ?
                    <Feed myWorkouts history={this.props.history} darkTitles workouts={this.props.myWorkouts.posts}/>
                : 
                    <React.Fragment>
                        <h2 className={classes.EmptyText}>Hmm, looks like you haven't posted yet.</h2>
                        <p className={classes.EmptySubext}>Remember: Workout Hub is personalized out of the box, so <strong>no account needed.   Ever.</strong></p>
                        <img className={classes.EmptyImage} src={empty2}/>
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        myWorkouts: state.load.myWorkouts,
        likedIDs: state.auth.likedIDs,
        loading: state.load.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: route => dispatch(loadPostsAsync(route)),
        onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWorkouts);