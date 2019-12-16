import * as actionTypes from '../actions/actionTypes'

import Filter from 'bad-words';

const profanityFilter = new Filter();

const initialState = {
    title: '',
    select: 'General',
    exercises: [],
    titleValid: false
}

const createReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_TITLE:
            const titleValid = action.title.length >= 6 && action.title.length <= 30 && action.title === profanityFilter.clean(action.title) ? true : false;
            return {
                ...state,
                title: action.title,
                titleValid: titleValid
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
        default:
            return state
    }
}

export default createReducer;