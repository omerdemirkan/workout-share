import React from 'react';
import {connect} from 'react-redux';
import {loadPostsAsync} from '../../store/actions/index'
import classes from './MyFavorites.module.css';
import Feed from '../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../Inspect/Inspect'
import empty from '../../images/empty.svg';

class MyFavorites extends React.Component {

    componentDidMount() {
        if (this.props.myFavorites.length === 0) {
            this.props.onLoadPosts('/my-favorites');
        }
    }

    render() {
        return <React.Fragment>
            <Route path={this.props.history.location.pathname} exact component={Inspect}/>  
            <div className={classes.MyFavorites}>
                <h1 className={classes.Header}>My Favorites</h1>
                {this.props.myFavorites.length || this.props.loading > 0 ?
                    <Feed favorites={this.props.likedIDs} history={this.props.history} darkTitles workouts={this.props.myFavorites}/>
                : 
                    <React.Fragment>
                        <h2 className={classes.EmptyText}>Hmm, looks like you haven't favorited anything.</h2>
                        <p className={classes.EmptySubext}>Remember: Workout Hub is personalized out of the box, so <strong>no account needed.   Ever.</strong></p>
                        <img className={classes.EmptyImage} src={empty}/>
                        
                    </React.Fragment>
                }
            </div>
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        myFavorites: state.load.myFavorites,
        likedIDs: state.auth.likedIDs,
        loading: state.load.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: route => dispatch(loadPostsAsync(route))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);