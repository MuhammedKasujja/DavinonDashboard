import { FETCH_DRIVERS, ADD_DRIVER, ADD_LOCAL_DRIVER } from "../actions/Types"

const initState = {
    drivers: [],
    isAdded: false,
    localDriver:null
}

export const driversReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_DRIVER:
            return { ...state, isAdded: action.payload.isAdded }
        case FETCH_DRIVERS:
            return { ...state, drivers: action.payload.drivers }
        case ADD_LOCAL_DRIVER:
            return { ...state, localDriver: action.payload.localDriver }
        default:
            return state;
    }
}