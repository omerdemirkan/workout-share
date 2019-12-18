import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';

const Feed = props => {
    
    return <div className={classes.Cards}>
        { props.workouts ?
        props.workouts.map(workout => {
            return <Card history={props.history} darkTitle={props.darkTitles} workout={workout}/>
        })
        : null}
    </div>
}

export default Feed;