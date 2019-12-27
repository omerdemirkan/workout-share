import * as actionTypes from '../actions/actionTypes';

const initialState = {
    all: {
        posts: [],
        hasMore: true
    },
    powerlifting: {
        posts: [],
        hasMore: true
    },
    bodybuilding: {
        posts: [],
        hasMore: true
    },
    weightlifting: {
        posts: [],
        hasMore: true
    },
    endurance: {
        posts: [],
        hasMore: true
    },
    crossfit: {
        posts: [],
        hasMore: true
    },
    myFavorites: {
        posts: [],
        hasMore: true
    },
    myWorkouts: {
        posts: [],
        hasMore: true
    },
    loading: false,
}

const load = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOAD_POSTS_START:
            return {
                ...state,
                loading: true,
                currentPath: action.route
            }
        case actionTypes.LOAD_POSTS_SUCCESS:
            let newState = {...state};
            if (action.replace) {
                newState[action.list].posts = action.posts;
                newState[action.list].hasMore = action.hasMore;

            } else {
                newState[action.list].posts.push(...action.posts);
                newState[action.list].hasMore = action.hasMore;
            }
            newState.loading = false;
            return newState;
        case actionTypes.LOAD_POSTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.REFRESH_LOAD:
            return {
                ...state,
                [action.list]: {
                    posts: [],
                    hasMore: true
                }
            }
        default:
            return state
    }
}

export default load;