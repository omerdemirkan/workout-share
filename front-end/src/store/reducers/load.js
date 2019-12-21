import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all: [],
    powerlifting: [],
    bodybuilding: [],
    weightlifting: [],
    endurance: [],
    crossfit: [],
    myFavorites: [],
    myWorkouts: [],
    loading: false,
}

const load = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_POSTS_START:
            return {
                ...state,
                loading: true,
                currentPath: action.route
            }
        case actionTypes.LOAD_POSTS_SUCCESS:
            let newState = {...state};
            newState[action.list] = action.posts;
            newState.loading = false;
            return newState;
        case actionTypes.LOAD_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default load;