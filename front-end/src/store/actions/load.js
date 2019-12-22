import * as actionTypes from './actionTypes';
import axios from '../../axios';
import routeToType from '../../helper/route-to-type';

export const loadPostsAsync = (route, currentNumPosts) => {
    return dispatch => {
        console.log(currentNumPosts);
        dispatch(loadPostsStart(route));
        axios.get('/workouts' + route, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('authToken'),
              currentPosts: currentNumPosts
            }
        })
        .then(res => {
            console.log(res.data)
            console.log(routeToType(route));
            dispatch(loadPostsSuccess(routeToType(route), res.data));
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

const loadPostsSuccess = (list, posts) => {
    return {type: actionTypes.LOAD_POSTS_SUCCESS, posts: posts, list: list}
}

const loadPostsFailure = error => {
    return {type: actionTypes.LOAD_POSTS_FAILURE, error: error}
}