import React from 'react';
import {connect} from 'react-redux';
import {loadPostsAsync} from '../../store/actions/index'
import classes from './MyFavorites.module.css';
import Feed from '../../components/feed/Feed';
import {Route} from 'react-router-dom';
import Inspect from '../Inspect/Inspect'
import empty from '../../images/empty3.svg';
import axios from '../../axios';
import routeToType from '../../helper/route-to-type';
import * as actionTypes from '../../store/actions/actionTypes';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroller';

class MyFavorites extends React.Component {

    state = {
        search: null,
        searchID: null
    }

    componentDidMount() {
        // this.loadPostsHandler();
        this.props.onLoadPosts(this.props.history.location.pathname, 0);
        window.scrollTo(0, 0)
        
        if (this.props.history.location.search.length > 0) {
            this.checkSearchHandler();
        }
    }

    componentDidUpdate() {
        if (this.state.search !== this.props.history.location.search) {
            this.checkSearchHandler();
        }
    }

    loadPostsHandler = () => {
        const load = this.props.myFavorites
        if (load.hasMore && !this.props.loading) {
            this.props.onLoadPosts(this.props.history.location.pathname, load.posts.length);
        }
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
            <div className={classes.MyFavorites}>
                <h1 className={classes.Header}>My Favorites</h1>

                {this.props.likedIDs && this.props.likedIDs.length > 0 ?

                    <InfiniteScroll
                        loadMore={this.loadPostsHandler}
                        hasMore={this.props.myFavorites.hasMore}
                        loader={<CircularProgress/>}
                    >
                        <Feed favorites={this.props.likedIDs} history={this.props.history} darkTitles workouts={this.props.myFavorites.posts}/>
                    </InfiniteScroll>
                    
                : null}

                {this.props.likedIDs && this.props.likedIDs.length === 0 ?
                    <div style={{width: '80%', maxWidth: '600px', margin: 'auto'}}>
                        <h2 className={classes.EmptyText}>Hmm, looks like you haven't favorited anything.</h2>
                        <p className={classes.EmptySubext}>Remember: Workout Share is personalized out of the box, so <strong>no account needed.   Ever.</strong></p>
                        <img className={classes.EmptyImage} src={empty}/>
                    </div>
                : null}
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
        onLoadPosts: (route, numPosts) => dispatch(loadPostsAsync(route, numPosts)),
        onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyFavorites);