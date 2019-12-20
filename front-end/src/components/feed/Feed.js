import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';
import {connect} from 'react-redux'

class Feed extends React.Component {

    render() {
        return <div className={classes.Cards}>
            {this.props.workouts.map(workout => {
                
                return <Card disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })}
        </div>
    }
}

export default Feed;