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

import {titleFontSize, exerciseFontSize, formatFontSize} from '../../../helper/lengthToFontSize'

// disableLike: disables like button

class Card extends React.Component {

    state = {
        liked: false,
        previouslyLiked: 'unknown',
        numLikedIDs: null,
        likes: null
    }

    componentDidMount() {
        this.checkPreviouslyLiked();
    }

    componentWillUnmount() {
        console.log('Finna unmount')
    }

    componentDidUpdate() {
        const wasLiked = this.props.likedIDs.includes(this.props.workout._id);
        console.log(wasLiked);

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
            console.log(res.data)
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
        if (this.props.workout._id !== null) {
            this.props.history.push(this.props.history.location.pathname + '?id=' + this.props.workout._id);
            window.scrollTo(0, 0);
        }
    }

    render() {
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
                    {/* <td key={exercise.title}><p style={{fontSize: exerciseFontSize(exercise.title) + 'rem'}} className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/reps'}><p style={{fontSize: formatFontSize(format) + 'rem'}} className={classes.ExerciseListItem}>{format}</p></td> */}
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
                    {/* <td key={exercise.title}><p style={{fontSize: exerciseFontSize(exercise.title) + 'rem'}} className={classes.ExerciseListItem}>{exercise.title}</p></td>
                    <td key={exercise.title + ' sets/min/sec'}><p style={{fontSize: formatFontSize(format) + 'rem'}} className={classes.ExerciseListItem}>{format}</p></td> */}
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

        if (this.props.inspect && this.props.workout.exercises.length > 6) {
            // const extraSpace = ((this.props.workout.exercises.length - 6) * 50) + 340
            // inspectStyleModifer = {minHeight: extraSpace + 'px'}
            inspectStyleModifer = {minHeight: '340px'}
        }
        
        return <div className={this.props.inspect ? classes.InspectCard :  classes.Card} style={this.props.delay ? {animationDelay: this.props.delay.toFixed(2) + 's', ...inspectStyleModifer}: inspectStyleModifer}>
            <div className={classes.CardHeader}>
                <h2 
                className={classes.CardTitle} 
                style={{fontSize: titleFontSize(this.props.workout.title) + 'rem'}}
                onClick={this.titleClickHandler}
                >{this.props.workout.title}</h2>
            </div>
            <div style={this.props.inspect ? {overflow: 'auto'} : {}} className={classes.ListBox}>
                <table className={classes.ListTable}>
                    <tbody>
                        {exerciseList}
                    </tbody>
                </table>
            </div>

            {!this.props.inspect && this.props.workout.exercises.length > 6  ? <div className={classes.FadeOut}></div> : null}
    
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