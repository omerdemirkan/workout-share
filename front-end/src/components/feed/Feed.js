import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';

class Feed extends React.Component {
    
    render() {
        let delay = 0;
        return <div className={classes.Cards}>
            {this.props.workouts.map(workout => {
                delay += 0.01;
                return <Card delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })}
        </div>
    }
}

export default Feed;