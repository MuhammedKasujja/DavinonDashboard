import { FETCH_NOTIFICATIONS, ADD_NOTIFICATION } from "../actions/Types"

const initState = {
    trips: 0,
    drivers: 0,
}

export const notificatiosReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_NOTIFICATIONS:
            return { ...state, trips: action.payload.trips }
        case ADD_NOTIFICATION:
            return { ...state, trips: action.payload.trips }
        default:
            return state;
    }
}
