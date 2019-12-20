import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';

class Feed extends React.Component {

    render() {
        return <div className={classes.Cards}>
            {this.props.workouts.map(workout => {
                
                return <Card key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
            })}
        </div>
    }
}

export default Feed;