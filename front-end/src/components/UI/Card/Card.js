import React from 'react';
import classes from './Card.module.css';
import axios from '../../../axios';
import {connect} from 'react-redux';
import * as actionTypes from '../../../store/actions/actionTypes';

import TimeAgo from 'timeago-react';

import { colorsByDisplay } from '../../../helper/colors-by-path'

// -- Material UI --

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import {titleFontSize} from '../../../helper/lengthToFontSize';

import {motion} from 'framer-motion';

class Card extends React.Component {

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
        _id: null
    }

    componentDidMount() {
        this.checkPreviouslyLiked();
    }

    componentDidUpdate() {

        //Just in case (for inspected cards), doesn't cause infinite loop:
        this.checkPreviouslyLiked();

        if (this.props.likedIDs) {
            const wasLiked = this.props.likedIDs.includes(this.props.workout._id);

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
    }

    checkPreviouslyLiked = () => {
        if ( this.props.likedIDs && ((this.state.previouslyLiked === 'unknown') || (this.props.inspect && this.state._id !== this.props.workout._id)) ) {
            const wasLiked = this.props.likedIDs.includes(this.props.workout._id);
            this.setState({
                previouslyLiked: wasLiked,
                liked: wasLiked,
                numLikedIDs: this.props.likedIDs.length,
                likes: this.props.workout.likes.length,
                _id: this.props.workout._id
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

    render() {
        // displayType: Bodybuilding, General, etc.
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
                    <td key={exercise.title + ' sets/min/sec'}><p className={classes.ExerciseListItem}>{format}</p></td>
                </tr>
            }
        });

        let likes = null;
        if (this.state.likes > 0) {
            likes = <h2 style={this.state.liked ? {color: colorsByDisplay(displayType).darkColor} : {}} className={classes.LikesNumber}>{this.state.likes}</h2>
        }

        let inspectStyleModifer = {};

        if (this.props.inspect) {
            inspectStyleModifer = {minHeight: '340px'}
        }
        
        return <motion.div 
        className={this.props.inspect ? classes.InspectCard :  classes.Card} 
        style={inspectStyleModifer}

        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 145,
          damping: 15,
          delay: this.props.delay
        }}
        whileHover={{
            y: -2,
            transition: {delay: 0}
        }}
        >
            <div className={classes.CardHeader}>
                <h2 
                className={classes.CardTitle} 
                style={{fontSize: titleFontSize(this.props.workout.title) + 'rem'}}
                onClick={this.titleClickHandler}
                >{this.props.workout.title}</h2>
            </div>
            <div className={classes.ListBox}>
                <table className={classes.ListTable} style={this.props.inspect && this.props.workout.exercises.length > 5 ? {marginBottom: '50px'} : null}>
                    <tbody>
                        {exerciseList}
                    </tbody>
                </table>
            </div>

            {!this.props.inspect && this.props.workout.exercises.length > 5  ? <div className={classes.FadeOut}></div> : null}
    
            <div className={classes.CardFooter}>
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
        </motion.div>
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