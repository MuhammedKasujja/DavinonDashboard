import { ReportsState, ReportsActionTypes, FETCH_TRIPS_PAYMENTS } from "../../_types/Report"

const initialState: ReportsState = {
    tripPayments: []
}

export const reportsReducer = (state = initialState, action: ReportsActionTypes) => {
    switch (action.type) {
        case FETCH_TRIPS_PAYMENTS:
            return { ...state, tripPayments: action.payload }
        default:
            return state;
    }
}