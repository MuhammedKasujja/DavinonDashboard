import { DriverState, DriverActionTypes, FETCH_ALL_DRIVERS,ADD_DRIVER, ADD_LOCAL_DRIVER, FETCH_DRIVERS } from "./types"

const initialState: DriverState = {
    drivers: [],
    allDrivers: [],
    localDriver:undefined
}

export function driverReducer(state = initialState, action: DriverActionTypes): DriverState {
    switch (action.type) {
        case FETCH_DRIVERS:
            return { ...state, drivers: action.payload }
        case ADD_DRIVER:
            return {
                ...state,
                drivers: [...state.drivers, action.payload]
            }
        case ADD_LOCAL_DRIVER:
            return {
                ...state,
                localDriver: action.payload
            }
        case FETCH_ALL_DRIVERS:
            // console.log({'action.payload': action.payload})
            return {
                ...state,
                allDrivers: [...state.allDrivers, action.payload]
            }
        default:
            return state;
    }

}