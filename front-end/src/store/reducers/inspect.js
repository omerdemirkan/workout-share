import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all: null,
    powerlifting: null,
    bodybuilding: null,
    weightlifting: null,
    enurance: null,
    crossfit: null
}

const inspect = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_INSPECT:
            return {
                ...state,
                [action.select]: action.workout
            };
        case actionTypes.CLOSE_INSPECT:
            return {
                ...state,
                [action.select]: null
            };
        default: 
            return state;
    }
}

export default inspect;