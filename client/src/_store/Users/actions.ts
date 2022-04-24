import { Dispatch } from "redux"
import { AuthActionTypes, AUTH_USER, LOGOUT, FETCH_USERS } from "./types"
import service from "../../App/services/index";
import { ERROR, LOADING } from "_types/AppSettings";

export const login = (password: string, email: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: true
    })
    try {
        const res = await service.UserService.login(email, password)
        console.log(res.data)
        const date = Date.now().toString()
        localStorage.setItem('token', res.data.token)//new Date().toISOString())
        localStorage.setItem('uid', res.data.uid)
        localStorage.setItem('lastLoginDate', res.data.lastSignInTime)
        const user = res.data.user;
        const jsonUser = JSON.stringify(user)
        localStorage.setItem('user', jsonUser)
        dispatch({
            type: AUTH_USER,
            payload: {
                id: user.userId, email: user.email, firstName: user.username,
                lastName: user.username, password: password, displayName: user.username,
                enabled: user.enabled, role: user.role, lastLogin: user.lastLogin
            }
        })
    } catch (error) {
        console.log({NetworkError:error.response.data.message})
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
        // showError(error)
    } finally {
        dispatch({
            type: LOADING,
            payload: false
        })
    }
}

 const showError = (error: any) => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: error.response.data.message
    })
}

export const logout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    localStorage.clear()
    dispatch({
        type: LOGOUT,
        payload: undefined
    })
}

export const fetchUsers = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    const res = await service.UserService.fetchUsers()
    console.log(res.data)

    dispatch({
        type: FETCH_USERS,
        payload: res.data.users
    })
}

export const clearError =() =>(dispatch: Dispatch<AuthActionTypes>)=>{
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: false
    })
}