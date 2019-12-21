import React from 'react';
import classes from './Card.module.css';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';
import routeToType from '../../../helper/route-to-type';

import { colorsByDisplay } from '../../../helper/colors-by-path'

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

// disableLike: disables like button

class Card extends React.Component {

    state = {
        liked: false,
        previouslyLiked: 'unknown',
        numLikedIDs: null
    }

    componentDidMount() {
        this.checkPreviouslyLiked();
    }

    componentDidUpdate() {

        // updates for inspect cards need to check for previously liked on every update to update previouslyLiked on every new card inspected,
        // otherwise there will be a glitch that allows for multiple likes (or unlikes) per user.

        if (this.state.numLikedIDs !== this.props.likedIDs.length || this.state.previouslyLiked !== this.props.likedIDs.includes(this.props.workout._id)) {
            console.log('rechecking previously liked ');
            this.checkPreviouslyLiked();
        }
    }

    checkPreviouslyLiked = () => {
        if (this.props.likedIDs) {
            this.setState({
                previouslyLiked: this.props.likedIDs.includes(this.props.workout._id),
                liked: this.props.likedIDs.includes(this.props.workout._id),
                numLikedIDs: this.props.likedIDs.length
            });
        }
    }

    likeToggleHandler = () => {

        let modifier = null;
        if (this.state.liked) {
            //Like
            this.props.onSetLikedID(this.props.likedIDs.filter(id => {
                return id !== this.props.workout._id
            }));

            modifier = '/dec/' + this.props.workout._id;
        } else {
            //Unlike
            this.props.onSetLikedID([...this.props.likedIDs, this.props.workout._id]);

            modifier = '/inc/' + this.props.workout._id;
        }
        
        axios.defaults.headers.post['authorization'] = "Bearer " + localStorage.getItem('authToken')
        axios.post('/like' + modifier)
        .then(res => {
            console.log(res.data.liked.length);
        })
        .catch(err => {
            console.log(err);
        });

        const reverse = !this.state.liked;
        this.setState({
            liked: reverse
        });
    }

    titleClickHandler = () => {
        if (this.props.workout._id !== null) {
            this.props.history.push({
                pathname: this.props.history.location.pathname,
                search: '?id=' + this.props.workout._id
            });
            this.props.onSetInspect(this.props.workout, routeToType(this.props.history.location.pathname));
            window.scrollTo(0, 0);
        }
    }

    render() {
        const displayType = this.props.workout.type;
        const exerciseList = this.props.workout.exercises.map(exercise => {
            if (exercise.reps) {
                return <tr key={exercise.title + ' row'}>
                    <td key={exercise.title}><p className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/reps'}><p className={classes.ExerciseListItem}>{exercise.sets} set{exercise.sets > 1 ? 's' : null} of {exercise.reps} reps</p></td>
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
                
                return <tr key={exercise.title + ' row'}>
                    <td key={exercise.title}><p className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/min/sec'}><p className={classes.ExerciseListItem}>{exercise.sets} set{exercise.sets > 1 ? 's' : null} of {duration}</p></td>
                </tr>
            }
        });
        return <div className={classes.Card}>
            <div className={classes.CardHeader}>
                <h2 
                className={classes.CardTitle} 
                style={this.props.darkTitle ? {} : {color: colorsByDisplay(displayType).darkColor}}
                onClick={this.titleClickHandler}
                >{this.props.workout.title}</h2>
            </div>
            <div className={classes.ListBox}>
                <table className={classes.ListTable}>
                    <tbody>
                        {exerciseList}
                    </tbody>
                </table>
            </div>
    
            <div className={classes.CardFooter}>
            {this.props.darkTitle ? <p style={{color: colorsByDisplay(displayType).darkColor, position: 'absolute', margin: '0px', left: '50%', transform: 'translate(-50%)', bottom: '14px', fontWeight: '500'}}>{displayType}</p> : null}
            <button disabled={this.props.disableLike || this.state.previouslyLiked === 'unknown'} onClick={this.likeToggleHandler} className={classes.LikeButton}>
                
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

const mapStateToProps = state => {
    return {
        likedIDs: state.auth.likedIDs
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSetLikedID: likedIDs => dispatch({type: actionTypes.SET_LIKED_ID, likedIDs: likedIDs}),
      onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);