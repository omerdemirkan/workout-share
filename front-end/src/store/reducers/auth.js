import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authToken: null,
    likes: null,
    posted: null,

    likedID: [],
    postedID: []
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_AUTH_TOKEN:
            return {
                authToken: action.authToken
            }
            case actionTypes.SET_LIKED_ID:
                return {
                    ...state,
                    likedID: action.likedID
                }
            case actionTypes.SET_POSTED_ID:
                return {
                    ...state,
                    postedID: action.postedID
                }
        default: 
            return state;
    }
};

export default authReducer;