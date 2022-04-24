import { ERROR, LOADING, SUCCESS } from "_types/AppSettings"
import {
    VehicleState, VehicleActionTypes, FETCH_CARS, ADD_CAR, ADD_LOCAL_CAR,
    FETCH_TONNAGES, FETCH_TRUCK_BODIES, FETCH_VEHICLE_TYPES
} from "./types"

const initialState: VehicleState = {
    vehicles: [],
    vehicleTypes: [],
    tonnages: [],
    truckBodies: [],
    isLoading: false,
    error: undefined,
    success: undefined,
    localVehicle:undefined
}

export function vehicleReducer(state = initialState, action: VehicleActionTypes): VehicleState {
    switch (action.type) {
        case FETCH_CARS:
            return { ...state, vehicles: action.payload }
        case ADD_CAR:
            return {
                ...state,
                vehicles: [...state.vehicles, action.payload]
            }
        case ADD_LOCAL_CAR:
            return {
                ...state,
                localVehicle:action.payload
            }
        case FETCH_VEHICLE_TYPES:
            return { ...state, vehicleTypes: action.payload }
        case FETCH_TRUCK_BODIES:
            return {
                ...state, truckBodies: action.payload
            }
        case FETCH_TONNAGES:
            return {
                ...state,
                tonnages: action.payload
            }
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