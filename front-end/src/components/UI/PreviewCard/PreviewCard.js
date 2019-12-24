

// The same as a Card, but with delete functionality for each exercise as well as the whole workout.

import React from 'react';
import classes from './PreviewCard.module.css'

// Redux
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes'

import { colorsByDisplay } from '../../../helper/colors-by-path'
import {titleFontSize, exerciseFontSize, formatFontSize} from '../../../helper/lengthToFontSize'

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';

// disableLike: disables like button

class Card extends React.Component {

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
                let format = null
                if (exercise.sets > 1) {
                    format = exercise.sets + ' sets: ' + exercise.reps + ' reps';
                } else {
                    format = exercise.sets + ' set: ' + exercise.reps + ' reps';
                }
                return <tr key={exercise.title + ' row'}>
                    <td key={exercise.title}><p style={{fontSize: exerciseFontSize(exercise.title) + 'rem'}} className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/reps'} style={{position: 'relative'}}>
                        <p style={{fontSize: formatFontSize(format) + 'rem'}} className={classes.ExerciseListItem}>{format}</p>
                        <button className={classes.DeleteExerciseButton}><ClearRoundedIcon onClick={() => this.props.onDeleteExercise(exercise.title)}/></button>
                    </td>
                </tr>
            } else {
                let duration = '';
                if (exercise.minutes > 0) {
                    if (exercise.seconds > 0) {
                        if (exercise.seconds < 10) {
                            duration = exercise.minutes + ':0' + exercise.seconds + ' min';
                        } else {
                            duration = exercise.minutes + ':' + exercise.seconds + ' min';
                        }
                    } else {
                        duration = exercise.minutes + ' min'
                    }
                } else {
                    duration = exercise.seconds + ' sec'
                }

                let format = '';
                if (exercise.sets > 1) {
                    format = exercise.sets + ' sets: ' + duration
                } else {
                    format = exercise.sets + ' set: ' + duration
                }
                
                return <tr key={exercise.title + ' row'}>
                    <td key={exercise.title}><p style={{fontSize: exerciseFontSize(exercise.title) + 'rem'}} className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/min/sec'}><p style={{fontSize: formatFontSize(format) + 'rem'}} className={classes.ExerciseListItem}>{format}</p></td>
                </tr>
            }
        });
        return <div className={classes.PreviewCard} style={this.props.cardStyle !== null ? this.props.cardStyle : null}> 
            <div className={classes.CardHeader}>
                <h2 className={classes.CardTitle} style={{color: 'rgb(73, 73, 73)', fontSize: titleFontSize(this.props.workout.title) + 'rem'}}>{this.props.workout.title}</h2>
                <button onClick={this.props.deleteWorkout} className={classes.DeleteWorkoutButton}>
                    <DeleteIcon/>
                </button>
            </div>
            <div className={classes.ListBox}>
                <table className={classes.ListTable}>
                    <tbody>
                        {exerciseList}
                    </tbody>
                </table>
            </div>
            
            {this.props.workout.exercises.length > 6 ? <div className={classes.FadeOut}></div> : null}
    
            <div className={classes.CardFooter}>
            {this.props.darkTitle ? <p style={{color: colorsByDisplay(displayType).darkColor, position: 'absolute', margin: '0px', left: '50%', transform: 'translate(-50%)', bottom: '14px', fontWeight: '500'}}>{displayType}</p> : null}
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

const mapDispatchToProps = dispatch => {
    return {
        onDeleteExercise: title => dispatch({type: actionTypes.DELETE_EXERCISE, title: title})
    }
}

export default connect(null, mapDispatchToProps)(Card);