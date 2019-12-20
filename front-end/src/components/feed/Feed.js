import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';
import {connect} from 'react-redux'

class Feed extends React.Component {

    render() {
        let cards = null;
        if (this.props.likedIDs) {
            cards = this.props.workouts.map(workout => {
                const wasLiked = this.props.likedIDs.includes(workout._id);
                
                return <Card disableLike={false} liked={wasLiked} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })
        } else {
            cards = this.props.workouts.map(workout => {
                return <Card disableLike liked={'unknown'} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })
        }
        return <div className={classes.Cards}>
            {cards}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        likedIDs: state.auth.likedIDs
    }
}

export default connect(mapStateToProps, null)(Feed);