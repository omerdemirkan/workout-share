import React from 'react';
import classes from './DeleteCard.module.css';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';

import { colorsByDisplay } from '../../../helper/colors-by-path'
import TimeAgo from 'timeago-react';

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteIcon from '@material-ui/icons/Delete';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import ErrorModal from '../ErrorModal/ErrorModal';
import {titleFontSize} from '../../../helper/lengthToFontSize'

// disableLike: disables like button

class DeleteCard extends React.Component {

    state = {
        liked: false,
        // previouslyLiked is used to determine whether or not the workout 
        // should be displayed as already liked or not and to determine what 
        // to do on click (increment or decrement)
        previouslyLiked: 'unknown',
        // numLikedIDs is used to check if the likedIDs list has been changed,
        // upon which the card will check if it has been liked
        numLikedIDs: null,
        // Number of likes (workouts hold a list of user ids that have liked it)
        likes: null,
        // Controls whether or not the 'are you sure ...' modal shows up
        deleteWorkoutModal: false,
        // Deleted displays null rather than sending a new request.
        deleted: false,
        // Controls 'workouts deleted' snackbar.
        deletedMessage: false
    }

    componentDidMount() {
        this.checkPreviouslyLiked();
    }

    componentDidUpdate() {
        const wasLiked = this.props.likedIDs.includes(this.props.workout._id);

        //Just in case, doesn't cause infinite loop:
        this.checkPreviouslyLiked();

        if (this.state.previouslyLiked !== 'unknown' && this.state.numLikedIDs !== this.props.likedIDs.length && this.state.liked !== wasLiked) {
            // Checking 
            let newLikes = this.state.likes;
            if (wasLiked) {
                newLikes += 1;
            } else {
                newLikes -= 1;
            }
            this.setState({
                liked: wasLiked,
                numLikedIDs: this.props.likedIDs.length,
                likes: newLikes
            });
        }
    }

    checkPreviouslyLiked = () => {
        if (this.props.likedIDs && this.state.previouslyLiked === 'unknown') {
            const wasLiked = this.props.likedIDs.includes(this.props.workout._id);
            this.setState({
                previouslyLiked: wasLiked,
                liked: wasLiked,
                numLikedIDs: this.props.likedIDs.length,
                likes: this.props.workout.likes.length
            });
        }
    }

    likeButtonClickHandler = () => {

        //Modifier determines increment or decrement
        let modifier = null;
        if (this.state.liked) {
            // Removing workout id from likedIDs.
            this.props.onSetLikedID(this.props.likedIDs.filter(id => {
                return id !== this.props.workout._id
            }));

            modifier = '/dec/' + this.props.workout._id;
        } else {
            // Adding workout id to likedIDs
            this.props.onSetLikedID([...this.props.likedIDs, this.props.workout._id]);

            modifier = '/inc/' + this.props.workout._id;
        }
        
        axios.defaults.headers.post['authorization'] = "Bearer " + localStorage.getItem('authToken')
        axios.post('/like' + modifier)
        .then(res => {
            this.setState({
                likes: res.data.likes,
                liked: res.data.liked
            });
        })
        .catch(err => {
            console.log(err);
        });
    }

    titleClickHandler = () => {
        this.props.history.push(this.props.history.location.pathname + '?id=' + this.props.workout._id);
        window.scrollTo(0, 0);
    }

    deleteWorkoutModalOpenHandler = () => {
        this.setState({
            deleteWorkoutModal: true
        });
    }

    deleteWorkoutModalClosedHandler = () => {
        this.setState({
            deleteWorkoutModal: false
        });
    }

    deletedMessageClosedHandler = () => {
        this.setState({
            deletedMessage: false
        });
    }

    deleteWorkoutHandler = () => {
        axios.defaults.headers.delete['authorization'] = "Bearer " + localStorage.getItem('authToken');
        axios.delete('/workouts/' + this.props.workout._id)
        .then(res => {
            this.deleteWorkoutModalClosedHandler();
            this.setState({
                deletedMessage: true
            });

            const newWorkouts = this.props.myWorkouts.posts.filter(workout => {
                return workout._id !== this.props.workout._id
            })

            this.props.onSetMyWorkouts({
                posts: newWorkouts,
                hasMore: newWorkouts.length > 0
            })
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        if (this.state.deleted) {
            return <Snackbar
                    anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                    }}
                    open={this.state.deletedMessage}
                    autoHideDuration={3000}
                    onClose={this.deletedMessageClosedHandler}
                    message={<span id="message-id">Workout deleted</span>}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.deletedMessageClosedHandler}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
        }

        const displayType = this.props.workout.type;
        const exerciseList = this.props.workout.exercises.map(exercise => {
            if (exercise.reps) {

                let format = null
                if (exercise.sets > 1) {
                    format = exercise.sets + ' sets: ' + exercise.reps + ' reps';
                } else {
                    format = exercise.sets + ' set: ' + exercise.reps + ' reps';
                }

                return <tr key={exercise.title + ' row'}>
                    <td key={exercise.title}><p className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/reps'}><p className={classes.ExerciseListItem}>{format}</p></td>
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
                    <td key={exercise.title}><p className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/reps'}><p className={classes.ExerciseListItem}>{format}</p></td>
                </tr>
            }
        });

        let likes = null;
        if (this.state.likes > 0) {
            likes = <h2 style={this.state.liked ? {color: colorsByDisplay(displayType).darkColor} : {}} className={classes.LikesNumber}>{this.state.likes}</h2>
        }

        return <div className={classes.DeleteCard} style={this.props.delay ? {animationDelay: this.props.delay.toFixed(2) + 's'}: {}}>
            <div className={classes.DeleteCardHeader}>
                <h2 
                className={classes.DeleteCardTitle} 
                style={this.props.darkTitle ? {fontSize: titleFontSize(this.props.workout.title) + 'rem'} : {color: colorsByDisplay(displayType).darkColor, fontSize: titleFontSize(this.props.workout.title) + 'rem'}}
                onClick={this.titleClickHandler}
                >{this.props.workout.title}</h2>

                <button onClick={this.deleteWorkoutModalOpenHandler} className={classes.DeleteWorkoutButton}>
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

            {!this.props.inspect && this.props.workout.exercises.length > 5  ? <div className={classes.FadeOut}></div> : null}
    
            <div className={classes.DeleteCardFooter}>
            {this.props.darkTitle ? <p style={{color: colorsByDisplay(displayType).darkColor, position: 'absolute', margin: '0px', left: '50%', transform: 'translate(-50%)', bottom: '14px', fontWeight: '500'}}>{displayType}</p> : null}
            
            <div className={classes.TimeAgo}>
                <TimeAgo
                datetime={this.props.workout.createdAt} 
                style={{textTransform: 'capitalize'}}
                live={false}
                />
            </div>
            
            {likes}
                
            <button disabled={this.props.disableLike || this.state.previouslyLiked === 'unknown'} onClick={this.likeButtonClickHandler} className={classes.LikeButton}>
                    
                { !this.state.liked ?
                    <FavoriteBorderOutlinedIcon fontSize="large"/>
                :
                    <FavoriteIcon fontSize="large" style={{color: colorsByDisplay(displayType).darkColor}}/>
                }
            </button>
            
            </div>
            {this.state.deleteWorkoutModal ?
                <ErrorModal
                open={this.state.deleteWorkoutModal}
                header={'Are you sure you want to delete this workout?'}
                >
                    <div className={classes.DeleteModalOptionBox}>
                        <button 
                        className={classes.DeleteModalOptionButton} 
                        onClick={this.deleteWorkoutHandler}
                        style={{color: 'rgb(130, 0, 0)', borderColor: 'rgb(130, 0, 0)'}}
                        >Yes</button>
                        <button 
                        className={classes.DeleteModalOptionButton} 
                        onClick={this.deleteWorkoutModalClosedHandler}
                        style={{color: 'rgb(71, 71, 71)', borderColor: 'rgb(71, 71, 71)'}}
                        >No</button>
                    </div>
                </ErrorModal>
            : null}
        </div>
    }
}

const mapStateToProps = state => {
    return {
        myWorkouts: state.load.myWorkouts,
        likedIDs: state.auth.likedIDs
    }
}

const mapDispatchToProps = dispatch => {
    return {
      onSetLikedID: likedIDs => dispatch({type: actionTypes.SET_LIKED_ID, likedIDs: likedIDs}),
      onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type}),
      onSetMyWorkouts: (workouts) => dispatch({type: actionTypes.LOAD_POSTS_SUCCESS, posts: workouts.posts, list: 'myWorkouts', replace: true, hasMore: workouts.hasMore})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteCard);