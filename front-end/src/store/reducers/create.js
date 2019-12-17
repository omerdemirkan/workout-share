import * as actionTypes from '../actions/actionTypes';

const initialState = {
    title: '',
    select: 'General',
    exercises: []
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
                return exercise.title !== action.title
            });
            console.log(filteredExercises);
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