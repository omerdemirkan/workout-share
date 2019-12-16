import React from 'react';
import classes from './Card.module.css'

import { colorsByDisplay } from '../../../helper/colors-by-path'

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

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
                return <li className={classes.ExerciseListItem}>{exercise.title}: {exercise.sets} set{exercise.sets > 1 ? 's' : null} of {exercise.reps} reps</li>
            } else {
                return <li className={classes.ExerciseListItem}>{exercise.title}: {exercise.sets} set{exercise.sets > 1 ? 's' : null} of {exercise.minutes}:{exercise.seconds} minutes</li>
            }
        });
        return <div className={classes.Card}> 
            <div className={classes.CardHeader}>
                <h2 className={classes.CardTitle} style={{color: colorsByDisplay(displayType).darkColor}}>{this.props.workout.title}</h2>
            </div>
            <div className={classes.ListBox}>
                {exerciseList}
            </div>
    
            <div className={classes.CardFooter}>
            <button onClick={this.likeToggleHandler} className={classes.LikeButton}>
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