import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes'

export const postAnonAsync = workout => {
    return dispatch => {
        dispatch(postAnonStart());
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

const postAnonSuccess = id => {
    return {type: actionTypes.POST_ANON_SUCCESS, id: id}
}

const postAnonFailure = () => {
    return {type: actionTypes.POST_ANON_FAILURE}
}