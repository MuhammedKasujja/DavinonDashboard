import User from "_types/User"

export const ADD_USER = "ADD_USER"
export const AUTH_USER = "AUTH_USER"
export const LOGOUT = "LOGOUT"

export interface AuthState {
    user: User | undefined
}

export interface AuthLoginAction {
    type: typeof AUTH_USER
    payload: User | undefined
}

export interface AuthLogoutAction {
    type: typeof LOGOUT
    payload: undefined
}

export type AuthActionTypes = AuthLoginAction | AuthLogoutAction