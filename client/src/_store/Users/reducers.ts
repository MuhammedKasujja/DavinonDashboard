import { ERROR, LOADING, SUCCESS } from "_types/AppSettings"
import { AUTH_USER, LOGOUT, AuthActionTypes, AuthState, FETCH_USERS } from "./types"

const initialState: AuthState = {
    user: undefined,
    users: [],
    isLoading: false,
    error: undefined,
    success: undefined
}

export const authReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.payload }
        case LOGOUT:
            return { ...state, user: action.payload }
        case FETCH_USERS:
            return { ...state, users: action.payload }
        case LOADING:
            return { ...state, isLoading: action.payload }
        case ERROR:
            return { ...state, error: action.payload }
        case SUCCESS:
            return { ...state, success: action.payload }
        default:
            return state;
    }
}