import { AppStateLoading , AppStateError, AppState, AppStateSuccess} from "_types/AppSettings"
import User from "_types/User"

export const ADD_USER = "ADD_USER"
export const AUTH_USER = "AUTH_USER"
export const LOGOUT = "LOGOUT"
export const FETCH_USERS = "FETCH_USERS"

export interface AuthState extends AppState {
    user: User | undefined,
    users: User[],
}

export interface AuthLoginAction {
    type: typeof AUTH_USER
    payload: User | undefined
}

export interface AuthFetchUsersAction {
    type: typeof FETCH_USERS
    payload: User[]
}

export interface AuthLogoutAction {
    type: typeof LOGOUT
    payload: undefined
}

export type AuthActionTypes = AuthLoginAction | AuthLogoutAction | AuthFetchUsersAction | AppStateLoading | AppStateError | AppStateSuccess