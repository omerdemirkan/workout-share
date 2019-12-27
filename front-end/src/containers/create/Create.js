import React from 'react';
import { colorsByDisplay } from '../../helper/colors-by-path';
import PreviewCard from '../../components/UI/PreviewCard/PreviewCard';
import ErrorModal from '../../components/UI/ErrorModal/ErrorModal';

import {Redirect} from 'react-router-dom'

// Styling
import classes from './Create.module.css';

// Material UI

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import grey from '@material-ui/core/colors/grey';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import AddIcon from '@material-ui/icons/Add';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';
import {postAnonAsync} from '../../store/actions/index';

// Profanity Filter
import Filter from 'bad-words';
const profanityFilter = new Filter();


const theme = createMuiTheme({
  palette: {
    primary: {
        500: grey[700],
        backgroundColor: grey[100]
    }
  }
});

const exerciseErrorMessages = {
    title: 'Exercise titles must be between 4 and 20 characters',
    sets: 'Sets must be between 1 and 10',
    reps: 'Reps must be between 1 and 30',
    minutes: 'Minutes must be between 0 and 120',
    seconds: 'Seconds must be between 0 and 59',
    noDuration: 'Exercises must have a duration',
    uniqueTitle: 'Each exercise title must be unique',
    profanity: 'No profanity allowed!'
}

// Number value and string length limites in [min, max] format
const valueLimits = {
    title: [4, 20],
    sets: [1, 10],
    reps: [1, 30],
    minutes: [0, 120],
    seconds: [0, 59]
}

class Create extends React.Component {
    state = {
        currentExercise: {
            title: '',
            type: 'sets-reps',
            sets: 0,
            reps: 0,
            minutes: 0,
            seconds: 0
        },
        exerciseErrorMessages: [],
        workoutErrorMessages: [],

        //Modal State
        deleteWorkoutModal: false,

        //To alert the user to input 3 exercises to be able to post
        twoMoreAlert: false
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    componentWillUnmount() {
        this.props.onResetCreateHandler();

    }

    updateExerciseHandler = (event, field) => {
        let newExercise = {...this.state.currentExercise};
        if (field === 'title') {
            if (this.state.currentExercise.title.length !== valueLimits.title[1] || this.state.currentExercise.title.length > event.target.value.length) {
                newExercise[field] = event.target.value;
                this.setState({currentExercise: newExercise});
            }
        } else {
            if (Number(event.target.value) <= valueLimits[field][1]) {
                newExercise[field] = Number(event.target.value);
                this.setState({currentExercise: newExercise});
            }
        }
    }

    changeTypeHandler = event => {
        if (event.target.value === 'sets-reps') {
            this.setState({currentExercise: {
                ...this.state.currentExercise,
                minutes: 0,
                seconds: 0,
                sets: 0,
                type: event.target.value
            }});
        } else {
            this.setState({currentExercise: {
                ...this.state.currentExercise,
                reps: 0,
                sets: 0,
                type: event.target.value
            }});
        }
    }

    addExerciseHandler = () => {
        const errorMessages = this.getExerciseErrorMessages()
        if (errorMessages.length === 0) {
            let exercise = null;
            if (this.state.currentExercise.type === 'sets-reps') {
                exercise = {
                    title: this.state.currentExercise.title.trim(),
                    type: this.state.currentExercise.type,
                    sets: this.state.currentExercise.sets,
                    reps: this.state.currentExercise.reps
                }
            } else {
                exercise = {
                    title: this.state.currentExercise.title.trim(),
                    type: this.state.currentExercise.type,
                    sets: this.state.currentExercise.sets,
                    minutes: this.state.currentExercise.minutes,
                    seconds: this.state.currentExercise.seconds
                }
            }
            if (this.props.exercises.length === 0) {
                this.openTwoMoreAlertHandler();
            }
            this.props.onAddExercise(exercise);
            this.resetCurrentExercise();
        } else {
            this.setState({exerciseErrorMessages: errorMessages});
        }
    }

    getExerciseErrorMessages = () => {
        let errorMessages = [];

        // Checking title: 
        if (this.state.currentExercise.title.length < valueLimits.title[0] || this.state.currentExercise.title.length > valueLimits.title[1]) {
            errorMessages.push(exerciseErrorMessages.title);
        }

        // Checking sets-reps / sets-min-sec: 
        let relevantFields = null
        if (this.state.currentExercise.type === 'sets-reps') {
            relevantFields = ['sets', 'reps'];
        } else {
            relevantFields = ['sets', 'minutes', 'seconds'];

            // Checking for a positive duration (because minutes and seconds can be 0 seperately, but not at the same time): 
            if (this.state.currentExercise.seconds === 0 && this.state.currentExercise.minutes === 0) {
                errorMessages.push(exerciseErrorMessages.noDuration);
            }
        }
        relevantFields.forEach(field => {
            if (this.state.currentExercise[field] < valueLimits[field][0] || this.state.currentExercise[field] > valueLimits[field][1]) {
                errorMessages.push(exerciseErrorMessages[field]);
            }
        });

        //Checking for unique exercise name:
        if (this.props.exercises.length > 0) {
            let copyFound = false;
            this.props.exercises.forEach(exercise => {
                if (this.state.currentExercise.title.trim() === exercise.title) {
                    copyFound = true;
                }
            });
            if (copyFound) {
                errorMessages.push(exerciseErrorMessages.uniqueTitle);
            }
        }

        //Checking for profanity:
        if (profanityFilter.clean(this.state.currentExercise.title) !== this.state.currentExercise.title) {
            errorMessages.push(exerciseErrorMessages.profanity);
        }

        return errorMessages;
    }

    resetCurrentExercise = () => {
        const newExercise = {...this.state.currentExercise}
        newExercise.title = '';
        // Sets, reps, minutes and seconds left as is.
        this.setState({
            currentExercise: newExercise,
            errors: [],
            errorMessages: []
        });
    }

    // Modal Handlers

    openTwoMoreAlertHandler = () => {this.setState({twoMoreAlert: true})}

    closeTwoMoreAlertHandler = () => {this.setState({twoMoreAlert: false})}



    openDeleteModalHandler = () => {this.setState({deleteWorkoutModal: true});}

    closeDeleteModalHandler = () => {this.setState({deleteWorkoutModal: false});}


    closeWorkoutTitleErrorModal = () => {this.setState({workoutErrorMessages: []})}

    closeExerciseErrorModalHandler = () => {this.setState({exerciseErrorMessages: []});}



    deleteWorkoutHandler = () => {
        this.props.onDeleteWorkout();
        this.setState({
            currentExercise: {
                title: '',
                type: 'sets-reps',
                sets: 0,
                reps: 0,
                minutes: 0,
                seconds: 0
            },
            errors: [],
            errorMessages: [],
            deleteWorkoutModal: false
        });
    }

    postWorkoutHandler = () => {
        let errors = [];
        if (profanityFilter.clean(this.props.title) !== this.props.title) {
            errors.push('Profanity found in title');
        }
        if (this.props.title.length < 6) {
            errors.push("Workout titles must be over 6 characters");
        }
        if (errors.length > 0) {
            this.setState({
                workoutErrorMessages: errors
            });
        } else {
            const workout = {
                title: this.props.title,
                type: this.props.select,
                exercises: this.props.exercises
            }
            this.props.onPostAnonHandler(workout, localStorage.getItem('authToken'));
        }
    }

    render() {
        if (this.props.postedWorkout) {
            this.props.onSetInspect(this.props.postedWorkout, 'all')
        }
        
        // If the user chooses the sets-reps format, we need inputs for sets and reps,
        // otherwise, we need sets, minutes and seconds as inputs.

        let inputsBasedOnFormat = null;
        if (this.state.currentExercise.type === 'sets-reps') {
            inputsBasedOnFormat = <div>
                <TextField
                id="outlined-number"
                label="Sets"
                value={this.state.currentExercise.sets ? this.state.currentExercise.sets: ''}
                type="number"
                variant="outlined"
                style={{width: '50%', height: '30px', color: 'rgb(71, 71, 71)', marginBottom: '30px'}}
                onChange={event => this.updateExerciseHandler(event, 'sets')}
                />
                <TextField
                id="outlined-number"
                label="Reps"
                type="number"
                value={this.state.currentExercise.reps ? this.state.currentExercise.reps: ''}
                variant="outlined"
                style={{width: '50%', height: '30px', color: 'rgb(71, 71, 71)', marginBottom: '30px'}}
                onChange={event => this.updateExerciseHandler(event, 'reps')}
                />
            </div>
        } else {
            inputsBasedOnFormat = <div>
                <TextField
                id="outlined-number"
                label="Sets"
                type="number"
                value={this.state.currentExercise.sets ? this.state.currentExercise.sets: ''}
                variant="outlined"
                style={{width: '100%', height: '40px', color: 'rgb(71, 71, 71)', marginBottom: '30px'}}
                onChange={event => this.updateExerciseHandler(event, 'sets')}
                />
                <TextField
                id="outlined-number"
                label="Minutes"
                type="number"
                value={this.state.currentExercise.minutes ? this.state.currentExercise.minutes: ''}
                variant="outlined"
                style={{width: '50%', height: '40px', color: 'rgb(71, 71, 71)', marginBottom: '30px'}}
                onChange={event => this.updateExerciseHandler(event, 'minutes')}
                />
                <TextField
                id="outlined-number"
                label="Seconds"
                type="number"
                value={this.state.currentExercise.seconds ? this.state.currentExercise.seconds: ''}
                variant="outlined"
                style={{width: '50%', height: '40px', color: 'rgb(71, 71, 71)', marginBottom: '30px'}}
                onChange={event => this.updateExerciseHandler(event, 'seconds')}
                />
            </div>
        }
        let workout = null;
        if (this.props.exercises.length > 0) {
            workout = {
                title: this.props.title,
                type: this.props.select,
                exercises: this.props.exercises
            }
        }




















        return <React.Fragment>
            {this.props.postedWorkout ?
            <Redirect to={{
                pathname: '/',
                search: '?id=' + this.props.postedWorkout._id
            }}/>
            : null}

            <div className={classes.MainHeaderBox}>
                <h1 className={classes.MainHeader}>Create Your Workout</h1>
            </div>
        <div className={classes.Create}>
            <ThemeProvider theme={theme}>
                <TextField 
                    label="Title" 
                    placeholder="e.g. Heavy Chest Day"
                    value={this.props.title}
                    autoComplete="off"
                    style={{marginTop: '8px', width: '100%', height: '40px', fontSize: '1.5rem', color: 'rgb(71, 71, 71)'}}
                    className={classes.TitleInput}
                    onChange={event => this.props.onUpdateTitle(event.target.value)}
                />
                <div className={classes.SelectBox}>
                    {/* To be gramatically correct, I check if the selected value is 'endurance' in order to place 'An' instead of 'A'. */}
                    <h2 className={classes.SelectPreview}>{this.props.select === 'Endurance' ? 'An' : 'A'} <span className={classes.SelectPreviewInput} style={{borderColor: colorsByDisplay(this.props.select).activeColor}}>{this.props.select}</span> Workout</h2>
                    <Select
                    value={this.props.select}
                    displayEmpty
                    color='primary'
                    className={classes.SelectInput}
                    style={{width: '100%', height: '40px', color: 'rgb(71, 71, 71)'}}
                    onChange={event => this.props.onUpdateSelect(event.target.value)}
                    >
                        <MenuItem value={'General'} selected>General</MenuItem>
                        <MenuItem value={'Powerlifting'} selected>Powerlifting</MenuItem>
                        <MenuItem value={'Bodybuilding'} selected>Bodybuilding</MenuItem>
                        <MenuItem value={'Weightlifting'} selected>Weightlifting</MenuItem>
                        <MenuItem value={'Endurance'} selected>Endurance</MenuItem>
                        <MenuItem value={'Crossfit'} selected>Crossfit</MenuItem>
                    </Select>
                    
                </div>
                    
                <h2 style={{color: 'rgb(71, 71, 71)'}}>Exercises</h2>
                <div className={classes.NewExerciseBox}>
                    <TextField 
                        color='primary' 
                        label={"Exercise " + (this.props.exercises.length + 1)}
                        placeholder="e.g. Incline Bench Press"
                        autoComplete="off"
                        style={{width: '100%', height: '40px', fontSize: '1.5rem', color: 'rgb(71, 71, 71)', marginBottom: '40px'}}
                        className={classes.TitleInput}
                        value={this.state.currentExercise.title}
                        onChange={event => this.updateExerciseHandler(event, 'title')}
                    />
                    <RadioGroup 
                    value={this.state.currentExercise.type} 
                    onChange={this.changeTypeHandler} row
                    style={{marginBottom: '20px'}}
                    >
                        <FormControlLabel
                        value="sets-reps"
                        control={<Radio color="primary" />}
                        label="Sets-Reps"
                        labelPlacement="end"
                        />
                        <FormControlLabel
                        value="sets-min-sec"
                        control={<Radio color="primary" />}
                        label="Sets-Min-Sec"
                        labelPlacement="end"
                        />
                    </RadioGroup>

                    {inputsBasedOnFormat}

                    <button disabled={this.props.exercises.length >= 10} onClick={this.addExerciseHandler} className={classes.AddExerciseButton}><AddIcon fontSize='large'/></button>

                    
                </div>
            </ThemeProvider>
        </div>
        
        <div className={classes.PreviewCardBox} style={this.props.exercises.length === 0 ? {position: 'relative', opacity: '0', top: '100px', transition: '0.2s ease-out'} : {}}>
            {this.props.exercises.length > 0 ?
                <React.Fragment>
                    <h1 className={classes.PreviewCardTitle}>Preview</h1>
                    <PreviewCard darkTitle deleteWorkout={this.openDeleteModalHandler} disableLike cardStyle={{width: '100%'}} workout={workout}/>
                </React.Fragment>
            : null}

        </div>
        
        <button 
        style={this.props.exercises.length < 3 ? {position: 'relative', opacity: '0', top: '20px'} : null} 
        className={classes.PostWorkoutButton}
        onClick={this.postWorkoutHandler}
        >Post Workout</button>
        
        
            {/* ----!!!!Alerts!!!!---- */}

            {this.state.exerciseErrorMessages.length > 0 ?
                <ErrorModal
                open={this.state.exerciseErrorMessages.length > 0}
                header='Invalid Exercise'
                list={[...this.state.exerciseErrorMessages]}
                close={this.closeExerciseErrorModalHandler}/>
            : null}
            
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
                        onClick={this.closeDeleteModalHandler}
                        style={{color: 'rgb(71, 71, 71)', borderColor: 'rgb(71, 71, 71)'}}
                        >No</button>
                    </div>
                </ErrorModal>
            : null}
            
            {this.state.workoutErrorMessages.length > 0 ?
                <ErrorModal
                open={this.state.workoutErrorMessages.length > 0}
                header='Error: Workout Title'
                list={[...this.state.workoutErrorMessages]}
                close={this.closeWorkoutTitleErrorModal}/>
            : null}

            <Snackbar
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            open={this.state.twoMoreAlert}
            autoHideDuration={6000}
            onClose={this.closeTwoMoreAlertHandler}
            message={<span className={classes.TwoMoreModalText} id="message-id">Add two more exercises to be able to post</span>}
            action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    className={classes.close}
                    onClick={this.closeTwoMoreAlertHandler}
                >
                    <CloseIcon />
                </IconButton>,
            ]}
            />
        </React.Fragment>
    }
}

const mapStateToProps = state => {
    return {
        title: state.create.title,
        select: state.create.select,
        exercises: state.create.exercises,
        errorMessages: state.create.errorMessages,
        postResult: state.create.postResult,
        postedWorkout: state.create.postedWorkout,
        authToken: state.auth.authToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateTitle: title => dispatch({type: actionTypes.SET_TITLE, title: title}),
        onUpdateSelect: select => dispatch({type: actionTypes.SET_SELECT, select: select}),
        onAddExercise: exercise => dispatch({type: actionTypes.ADD_EXERCISE, exercise: exercise}),
        onDeleteExercise: title => dispatch({type: actionTypes.DELETE_EXERCISE, title: title}),
        onDeleteWorkout: () => dispatch({type: actionTypes.DELETE_WORKOUT}),
        onPostAnonHandler: (workout, authToken) => dispatch(postAnonAsync(workout, authToken)),
        onSetInspect: (workout, type) => dispatch({type: actionTypes.SET_INSPECT, workout: workout, select: type}),
        onResetCreateHandler: () => dispatch({type: actionTypes.RESET_WORKOUT})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);