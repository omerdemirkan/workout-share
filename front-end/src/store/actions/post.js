import axios from '../../axios';
import * as actionTypes from '../actions/actionTypes'

export const postAnonAsync = workout => {
    return {type: actionTypes.POST_ANON_START};
    axios.post('/workouts', workout)
    .then(res => {
        return postAnonSuccess();
    })
    .catch(err => {
        return postAnonFailure();
    });
}

const postAnonSuccess = () => {
    return {type: actionTypes.POST_ANON_SUCCESS}
}

const postAnonFailure = () => {
    return {type: actionTypes.POST_ANON_FAILURE}
}