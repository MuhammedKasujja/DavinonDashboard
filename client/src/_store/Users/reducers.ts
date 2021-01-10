import { AUTH_USER, LOGOUT, AuthActionTypes, AuthState } from "./types"

const initialState: AuthState = {
    user: undefined
}

export const authReducer = (state = initialState, action: AuthActionTypes) => {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, user: action.payload }
        case LOGOUT:
            return { ...state, user: action.payload }
        default:
            return state;
    }
}