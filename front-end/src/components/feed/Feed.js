import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';
import {connect} from 'react-redux'

class Feed extends React.Component {
    state ={
        likesLoaded: false
    }
    render() {
        return <div className={classes.Cards}>
            { this.props.workouts && this.props.likedID ?
            this.props.workouts.map(workout => {
                const wasLiked = false
                for (let id in this.props.likedID) {
                    if (workout._id === id) {
                        wasLiked = true;
                    }
                }
                return <Card liked={wasLiked} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })
            :null}
            { this.props.workouts && !this.props.likedID ?
            this.props.workouts.map(workout => {
                return <Card disableLike history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })
            :null}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        liked: state.auth.likedID
    }
}

export default connect(mapStateToProps)(Feed);