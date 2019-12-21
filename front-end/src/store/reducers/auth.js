import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authToken: null,
    likedIDs: null,
    postedIDs: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_AUTH_TOKEN:
            return {
                ...state,
                authToken: action.authToken
            }
            case actionTypes.SET_LIKED_ID:
                return {
                    ...state,
                    likedIDs: action.likedIDs
                }
        default: 
            return state;
    }
};

export default authReducer;