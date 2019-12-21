import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';

class Feed extends React.Component {
    
    render() {
        if (this.props.favorites && this.props.workouts) {
            // In the favorites route, we make sure that everything in this route complies with likedIDs

            return <div className={classes.Cards}>
            {this.props.workouts.map(workout => {
                if (this.props.favorites.includes(workout._id)) {
                    return <Card key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
                }
            })}
        </div>
        } else if (this.props.workouts) {


            return <div className={classes.Cards}>
                {this.props.workouts.map(workout => {
                    return <Card key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
                })}
            </div>

            
        }
        
    }
}

export default Feed;