import {
    APP_STATE_ERROR,
    APP_STATE_LOADED,
    APP_STATE_SUCCESS,
    APP_STATE_LOADING
} from "../actions/Types"

const initState = {
    isLoading: false,
    isLoaded: false,
    isSuccess: false,
    hasError: false,
    message: null
}

export const appStateReducer = (state = initState, action) => {
    switch (action.type) {
        case APP_STATE_ERROR:
            return { ...state }
        case APP_STATE_LOADED:
            return { ...state }
        case APP_STATE_SUCCESS:
            return { ...state }
        case APP_STATE_LOADING:
            return { ...state }
        default:
            return state;
    }
}