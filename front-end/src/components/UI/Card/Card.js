import React from 'react';
import classes from './Card.module.css'
import axios from '../../../axios'

import { colorsByDisplay } from '../../../helper/colors-by-path'

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

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

        let modifier = null;
        if (this.state.liked) {
            //Like
            modifier = '/dec/' + this.props.workout._id;
        } else {
            //Unlike
            modifier = '/inc/' + this.props.workout._id;
        }
        
        axios.defaults.headers.post['authorization'] = "Bearer " + localStorage.getItem('authToken')
        axios.post('/like' + modifier)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        });
    }

    titleClickHandler = () => {
        console.log(this.props.history.location.pathname);
        console.log(this.props.workout._id);
        if (this.props.workout._id !== null) {
            this.props.history.push({
                pathname: this.props.history.location.pathname,
                search: '?id=' + this.props.workout._id
            });
            window.scrollTo(0, 0);
        }
    }

    render() {

        const displayType = this.props.workout.type;
        const exerciseList = this.props.workout.exercises.map(exercise => {
            if (exercise.reps) {
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
        return <div className={classes.Card} style={this.props.cardStyle !== null ? this.props.cardStyle : null}>
            <div className={classes.CardHeader}>
                <h2 
                className={classes.CardTitle} 
                style={this.props.darkTitle ? {} : {color: colorsByDisplay(displayType).darkColor}}
                onClick={this.titleClickHandler}
                >{this.props.workout.title}</h2>
            </div>
            <div className={classes.ListBox}>
                <table className={classes.ListTable}>
                    {exerciseList}
                </table>
            </div>
    
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

export default Card;