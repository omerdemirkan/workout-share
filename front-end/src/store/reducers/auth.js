import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authorized: false
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.AUTHORIZE_USER:
            return {
                authorized: true
            }
        default: 
            return state;
    }
};

export default authReducer;