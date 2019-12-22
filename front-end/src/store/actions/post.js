import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes'

export const postAnonAsync = (workout, authToken) => {
    return dispatch => {
        dispatch(postAnonStart());
        axios.defaults.headers.post['authorization'] = "Bearer " + authToken
        axios.post('/workouts', workout)
        .then(res => {
            dispatch(postAnonSuccess(res.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(postAnonFailure());
        }); 
    }
}

const postAnonStart = () => {
    return {type: actionTypes.POST_ANON_START};
}

const postAnonSuccess = workout => {
    return {type: actionTypes.POST_ANON_SUCCESS, workout: workout}
}

const postAnonFailure = () => {
    return {type: actionTypes.POST_ANON_FAILURE}
}