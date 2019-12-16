

// The same as a Card, but with delete functionality for each exercise as well as the whole workout.

import React from 'react';
import classes from './PreviewCard.module.css'

import { colorsByDisplay } from '../../../helper/colors-by-path'

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

// disableLike: disables like button

class Card extends React.PureComponent {

    state = {
        liked: false
    }

    likeToggleHandler = () => {
        const reverse = !this.state.liked;
        this.setState({
            liked: reverse
        });
    }

    render() {
        const displayType = this.props.workout.type.charAt(0).toUpperCase() + this.props.workout.type.substring(1);
        const exerciseList = this.props.workout.exercises.map(exercise => {
            if (exercise.type === 'sets-reps') {
                return <tr>
                    <td><p className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td><p className={classes.ExerciseListItem}>{exercise.sets} set{exercise.sets > 1 ? 's' : null} of {exercise.reps} reps</p></td>
                </tr>
            } else {
                let duration = '';
                if (exercise.minutes > 0) {
                    if (exercise.seconds > 0) {
                        if (exercise.seconds < 10) {
                            duration = exercise.minutes + ':0' + exercise.seconds + ' minutes';
                        } else {
                            duration = exercise.minutes + ':' + exercise.seconds + ' minutes';
                        }
                    } else {
                        duration = exercise.minutes + ' minutes'
                    }
                } else {
                    duration = exercise.seconds + ' seconds'
                }
                
                return <tr>
                    <td><p className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td><p className={classes.ExerciseListItem}>{exercise.sets} set{exercise.sets > 1 ? 's' : null} of {duration}</p></td>
                </tr>
            }
        });
        return <div className={classes.PreviewCard} style={this.props.cardStyle !== null ? this.props.cardStyle : null}> 
            <div className={classes.CardHeader}>
                <h2 className={classes.CardTitle} style={{color: colorsByDisplay(displayType).darkColor}}>{this.props.workout.title}</h2>
                <button onClick={this.props.deleteWorkout} className={classes.DeleteWorkoutButton}>
                    <DeleteIcon fontSize="large"/>
                </button>
            </div>
            <div>
                <table className={classes.ListTable}>
                    {exerciseList}
                </table>
            </div>
    
            <div className={classes.CardFooter}>
            <button disabled={this.props.disableLike} onClick={this.likeToggleHandler} className={classes.LikeButton}>
                { !this.state.liked ?
                    <FavoriteBorderOutlinedIcon fontSize="large"/>
                :
                    <FavoriteIcon fontSize="large" style={{color: colorsByDisplay(displayType).darkColor}}/>
                }
            </button>
            

            </div>
        </div>
    }
}

export default Card;