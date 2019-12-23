import * as actionTypes from './actionTypes';
import axios from '../../axios';
import routeToType from '../../helper/route-to-type';

export const loadPostsAsync = (route, currentNumPosts) => {
    return dispatch => {
        dispatch(loadPostsStart(route));
        axios.get('/workouts' + route, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('authToken'),
              currentPosts: currentNumPosts
            }
        })
        .then(res => {
            if (currentNumPosts) {
                dispatch(loadPostsSuccess(routeToType(route), res.data, false));
            } else {
                dispatch(loadPostsSuccess(routeToType(route), res.data, true));
            }
            
        })
        .catch(err => {
            console.log(err)
            dispatch(loadPostsFailure(err));
        });
    }
}

const loadPostsStart = route => {
    return {type: actionTypes.LOAD_POSTS_START, route: route}
}

const loadPostsSuccess = (list, posts, replace) => {
    return {type: actionTypes.LOAD_POSTS_SUCCESS, posts: posts, list: list, replace: replace}
}

const loadPostsFailure = error => {
    return {type: actionTypes.LOAD_POSTS_FAILURE, error: error}
}