const initState = {
    trips: []
}

export const tripsReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_TRIP":
            return { ...state }
        case "FETCH_TRIPS":
            return { ...state, trips: action.payload.trips }
        default:
            return state;
    }
}