import React from 'react';
import classes from './Feed.module.css';
import Card from '../UI/Card/Card';
import DeleteCard from '../UI/DeleteCard/DeleteCard';
import CircularProgress from '@material-ui/core/CircularProgress';

class Feed extends React.Component {

    state = {
        numWorkouts: this.props.workouts.length,
        prevNumWorkouts: null
    }

    componentDidUpdate() {
        if (this.state.numWorkouts !== this.props.workouts.length) {
            const oldNumWorkouts = this.state.numWorkouts;
            this.setState({
                numWorkouts: this.props.workouts.length,
                prevNumWorkouts: oldNumWorkouts
            });
        }
    }
    
    render() {
        if (this.state.numWorkouts === 0) {
            return <CircularProgress/>
        }

        let delay = 0;
        if (this.props.favorites && this.props.workouts && this.props.workouts.length > 0) {
            // In the favorites route, we make sure that everything in this route complies with likedIDs

            return <div className={classes.Cards}>
            {this.props.workouts.map(workout => {
                if (this.props.favorites.includes(workout._id)) {
                    delay += 0.10;
                    return <Card delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
                }
            })}
        </div>
        } else if (this.props.myWorkouts) {
            return <div className={classes.Cards}>
                {this.props.workouts.map(workout => {
                    delay += 0.10;
                    return <DeleteCard delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
                })}
            </div>
        } else if (this.props.workouts) {


            return <div className={classes.Cards}>
                {this.props.workouts.map((workout, index) => {
                    if (index + 1 > this.state.prevNumWorkouts) {
                        delay += 0.10;
                    }
                    return <Card delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
                })}
            </div>
        }
    }
}

export default Feed;