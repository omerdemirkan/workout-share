import React, {useState, useEffect} from 'react';
import classes from './Feed.module.css';
import Card from '../../containers/Card/Card';
import DeleteCard from '../../containers/DeleteCard/DeleteCard';

function Feed(props) {
    const [numWorkouts, setNumWorkouts] = useState({
        current: 0,
        previous: 0
    });

    const currentNumWorkouts = props.workouts ? props.workouts.length : 0;

    useEffect(() => {
        setNumWorkouts({
            current: currentNumWorkouts,
            previous: currentNumWorkouts !== 0 ? numWorkouts.current : null
        });
    }, [currentNumWorkouts]);

    let delay = 0;
    if (props.favorites && props.workouts && props.workouts.length > 0) {

        return <div className={classes.Cards}>
            {props.workouts.map((workout, index) => {
                if (props.favorites.includes(workout._id)) {
                    if (index + 1 > numWorkouts.current) {
                        delay += 0.08;
                    }
                    return <Card delay={delay} key={workout._id} disableLike={false} history={props.history} darkTitle={props.darkTitles} workout={workout}/>
                }
            })}
        </div>
    } else if (props.myWorkouts) {
        return <div className={classes.Cards}>
            {props.workouts.map((workout, index) => {
                if (index + 1 > numWorkouts.current) {
                    delay += 0.08;
                }
                return <DeleteCard delay={delay} key={workout._id} disableLike={false} history={props.history} darkTitle={props.darkTitles} workout={workout}/>
            })}
        </div>
    } else if (props.workouts) {

        return <div className={classes.Cards}>
            {props.workouts.map((workout, index) => {
                if (index + 1 > numWorkouts.current) {
                    delay += 0.08;
                }
                return <Card delay={delay} key={workout._id} disableLike={false} history={props.history} darkTitle={props.darkTitles} workout={workout}/>
            })}
        </div>
    }
}

// class Feed extends React.Component {
//     state = {
//         numWorkouts: this.props.workouts.length,

//         // prevNumWorkouts is used to calculate the delay for the phasein animation on each load.
//         prevNumWorkouts: null
//     }

//     // Checks for update to the number of workouts (to calculate delay)
//     componentDidUpdate() {
//         const newNumWorkouts = this.props.workouts.length;
//         if (this.state.numWorkouts !== newNumWorkouts) {
//             const oldNumWorkouts = this.state.numWorkouts;
//             this.setState({
//                 numWorkouts: newNumWorkouts,
//                 prevNumWorkouts: newNumWorkouts !== 0 ? oldNumWorkouts : 0
//             });
//         }
//     }

    
//     render() {
//         console.table(this.state.numWorkouts, this.state.prevNumWorkouts);
//         let delay = 0;
//         if (this.props.favorites && this.props.workouts && this.props.workouts.length > 0) {

//             return <div className={classes.Cards}>
//                 {this.props.workouts.map((workout, index) => {
//                     if (this.props.favorites.includes(workout._id)) {
//                         if (index + 1 > this.state.prevNumWorkouts) {
//                             delay += 0.08;
//                         }
//                         return <Card delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
//                     }
//                 })}
//             </div>
//         } else if (this.props.myWorkouts) {

//             return <div className={classes.Cards}>
//                 {this.props.workouts.map((workout, index) => {
//                     if (index + 1 > this.state.prevNumWorkouts) {
//                         delay += 0.08;
//                     }
//                     return <DeleteCard delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
//                 })}
//             </div>
//         } else if (this.props.workouts) {

//             return <div className={classes.Cards}>
//                 {this.props.workouts.map((workout, index) => {
//                     if (index + 1 > this.state.prevNumWorkouts) {
//                         delay += 0.08;
//                     }
//                     return <Card delay={delay} key={workout._id} disableLike={false} history={this.props.history} darkTitle={this.props.darkTitles} workout={workout}/>
//                 })}
//             </div>
//         }
//     }
// }

export default Feed;