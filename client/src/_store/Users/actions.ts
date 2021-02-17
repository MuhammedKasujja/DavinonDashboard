import { Dispatch } from "redux"
import { AuthActionTypes, AUTH_USER, LOGOUT } from "./types"
import service from "../../App/services/index";

export const login = (password: string, email: string) => async (dispatch: Dispatch<AuthActionTypes>) => {
    // const res = await service.UserService.signin(email, password)
    // console.log(res.data)
    // dispatch({
    //     type: AUTH_USER,
    //     payload:res.data
    // })
    const date =  Date.now().toString()
    localStorage.setItem('loginDate','2021-01-07 18:19:06.915285')//new Date().toISOString())

    dispatch({
        type:AUTH_USER,
        payload: {
            id: '6ST79HUR789JUO87G6', email: email, firstName: 'Kasujja',
            lastName: 'Ismail', password: password, displayName: 'Ismail Menk'
        }
    })
}

export const logout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
    dispatch({
        type: LOGOUT,
        payload: undefined
    })
}

