import * as actionTypes from './actionTypes';
import axios from '../../axios';
import routeToType from '../../helper/route-to-type';

export const loadPostsAsync = (route, currentNumPosts) => {
    return dispatch => {
        dispatch(loadPostsStart(route));
        if (!currentNumPosts) {
            currentNumPosts = 0;
        }
        axios.get('/workouts' + route, {
            headers: {
              authorization: 'Bearer ' + localStorage.getItem('authToken'),
              currentPosts: currentNumPosts
            }
        })
        .then(res => {
            if (currentNumPosts === 0) {
                console.log(res.data);
                dispatch(loadPostsSuccess(routeToType(route), res.data, true));
            } else {
                dispatch(loadPostsSuccess(routeToType(route), res.data, false));
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

const loadPostsSuccess = (list, res, replace) => {
    console.log(res);
    return {type: actionTypes.LOAD_POSTS_SUCCESS, posts: res.posts, hasMore: res.hasMore, list: list, replace: replace}
}

const loadPostsFailure = error => {
    return {type: actionTypes.LOAD_POSTS_FAILURE, error: error}
}