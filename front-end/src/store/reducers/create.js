import * as actionTypes from '../actions/actionTypes';

const initialState = {
    title: '',
    select: 'General',
    exercises: [],
    signupRedirect: false,
    posting: false,
    postResult: null,
    postedWorkout: null
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
        case actionTypes.SIGNUP_REDIRECT:
            return {
                ...state,
                signupRedirect: true
            }
        case actionTypes.POST_ANON_START:
            return {
                ...state,
                posting: true
            }
        case actionTypes.POST_ANON_SUCCESS:
            return {
                ...state,
                postResult: true,
                postedWorkout: action.workout,
                posting: false
            }
        case actionTypes.POST_ANON_FAILURE:
            return {
                ...state,
                postResult: false,
                posting: false
            }
        default:
            return state
    }
}

export default createReducer;