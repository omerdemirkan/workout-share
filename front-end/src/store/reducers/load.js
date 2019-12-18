import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all: [],
    powerlifting: [],
    bodybuilding: [],
    weightlifting: [],
    endurance: [],
    crossfit: [],
    loading: false
}

const load = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_POSTS_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOAD_POSTS_SUCCESS:
            return {
                ...state,
                [action.route]: action.posts
            }
        case actionTypes.LOAD_POSTS_FAILURE:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default load;