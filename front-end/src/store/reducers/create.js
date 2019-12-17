import * as actionTypes from '../actions/actionTypes'

import Filter from 'bad-words';

const profanityFilter = new Filter();

const initialState = {
    title: '',
    select: 'General',
    exercises: [],
    errorMessages: ["Workout titles must be between 6 and 30 characters"]
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TITLE:
            if (action.title.length > 30 ) {
                return {
                    ...state
                }
            } else {
                return {
                    ...state,
                    title: action.title
                }
            }
        case actionTypes.SET_SELECT:
            return {
                ...state,
                select: action.select
            }
        case actionTypes.ADD_EXERCISE:
            const newExercises = [...state.exercises];
            newExercises.push(action.exercise);
            return {
                ...state,
                exercises: newExercises
            }
        case actionTypes.DELETE_EXERCISE:
            const filteredExercises = state.exercises.filter(exercise => {
                return exercise.id !== action.id
            });
            return {
                ...state,
                exercises: filteredExercises
            }
        case actionTypes.DELETE_WORKOUT: 
            return initialState;
        case actionTypes.VALIDATE_WORKOUT_TITLE:
            let errors = [];
            if (profanityFilter.clean(state.title) !== state.title) {
                errors.push('Profanity found in title');
            }
            if (state.title.length < 6) {
                errors.push("Workout titles must be over 6 characters");
            }
            return {
                ...state,
                title: state.title,
                errorMessages: errors
            }
        default:
            return state
    }
}

export default createReducer;