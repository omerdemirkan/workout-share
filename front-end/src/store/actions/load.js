import * as actionTypes from './actionTypes';
import axios from '../../axios';
import routeToType from '../../helper/route-to-type';

export const loadPostsAsync = route => {
    return dispatch => {
        dispatch(loadPostsStart(route));
        axios.get('/workouts' + route)
        .then(res => {
            dispatch(loadPostsSuccess(routeToType(route), res.data));
        })
        .catch(err => {
            dispatch(loadPostsFailure(err));
        });
    }
}

const loadPostsStart = route => {
    return {type: actionTypes.LOAD_POSTS_START, route: route}
}

const loadPostsSuccess = (list, posts) => {
    return {type: actionTypes.LOAD_POSTS_SUCCESS, posts: posts, list: list}
}

const loadPostsFailure = error => {
    return {type: actionTypes.LOAD_POSTS_FAILURE, error: error}
}