import React from 'react';
import {connect} from 'react-redux';
import {loadPostsAsync} from '../../store/actions/index'
import classes from './MyWorkouts.module.css';
import Feed from '../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../Inspect/Inspect'
import empty2 from '../../images/empty2.svg';


class MyWorkouts extends React.Component {

    componentDidMount() {
        this.props.onLoadPosts('/my-workouts');
    }

    render() {
        return <React.Fragment>
            <Route path={this.props.history.location.pathname} exact component={Inspect}/>  
            <div className={classes.MyWorkouts}>
                <h1 className={classes.Header}>My Workouts</h1>
                {this.props.myWorkouts.length || this.props.loading > 0 ?
                    <Feed history={this.props.history} darkTitles workouts={this.props.myWorkouts}/>
                : 
                    <React.Fragment>
                        <h2 className={classes.EmptyText}>Hmm, looks like you haven't posted.</h2>
                        <p className={classes.EmptySubext}>Remember: Workout Hub is personalized out of the box, so <strong>no account needed. Ever.</strong></p>
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
        onLoadPosts: route => dispatch(loadPostsAsync(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyWorkouts);