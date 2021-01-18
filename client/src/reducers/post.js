import {
    GET_POSTS,
    POST_ERROR
} from '../actions/types';

const intitialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export default function(state = intitialState, action) {
    const { type, payload } = action;
    console.log(payload);
    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        
        case POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}
