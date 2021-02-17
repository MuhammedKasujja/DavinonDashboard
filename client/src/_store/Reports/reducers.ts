import { ReportsState, ReportsActionTypes, FETCH_TRIPS_PAYMENTS, FETCH_GRAND_PAYMENTS } from "../../_types/Report"

const initialState: ReportsState = {
    tripPayments: [],
    totalPayments: 0
}

export const reportsReducer = (state = initialState, action: ReportsActionTypes) => {
    switch (action.type) {
        case FETCH_TRIPS_PAYMENTS:
            return { ...state, tripPayments: action.payload }
        case FETCH_GRAND_PAYMENTS:
            return { ...state, totalPayments: action.payload }
        default:
            return state;
    }
}