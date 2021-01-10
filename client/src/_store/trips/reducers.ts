import { TripState, TripActionTypes, FETCH_TRIPS, ADD_LOCAL_TRIP, ADD_TRIP } from "./types"

const initialState: TripState = {
    trips: [],
    localTrip: undefined

}

export function tripReducer(state = initialState, action: TripActionTypes): TripState {
    switch (action.type) {
        case FETCH_TRIPS:
            return { ...state, trips: action.payload }
        case ADD_TRIP:
            return {
                ...state,
                trips: [...state.trips, action.payload]
            }
        case ADD_LOCAL_TRIP:
            return {
                ...state,
                localTrip: action.payload
            }
        default:
            return state;
    }

}