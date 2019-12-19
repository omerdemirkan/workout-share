import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authToken: null
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_AUTH_TOKEN:
            return {
                authToken: action.authToken
            }
        default: 
            return state;
    }
};

export default authReducer;