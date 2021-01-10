import { FETCH_PASSENGERS } from "../actions/Types"

const initState = {
    passengers: []
}

export const passengerReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_PASSENGERS:
            return { ...state, passengers: action.payload.passengers }
        default:
            return state;
    }
}