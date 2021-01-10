import { FETCH_CARS, FETCH_TONNAGES, FETCH_TRUCK_BODIES, FETCH_VEHICLE_TYPES, ADD_DATA } from "../actions/Types"

const initState = {
    trucks: [],
    vehicleTypes: [],
    tonnages: [],
    truckBodies: []
}

export const carsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_CARS:
            return { ...state, trucks: action.payload.trucks }
        case FETCH_TONNAGES:
            return { ...state, tonnages: action.payload.tonnages }
        case FETCH_TRUCK_BODIES:
            return { ...state, truckBodies: action.payload.truckBodies }
        case FETCH_VEHICLE_TYPES:
            return { ...state, vehicleTypes: action.payload.vehicleTypes }
        case ADD_DATA:
            return { ...state}
        default:
            return state;
    }
}