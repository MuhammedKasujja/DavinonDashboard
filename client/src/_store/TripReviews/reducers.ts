import { FETCH_TRIPS_REVIEWS, TripReviewActionTypes, TripReviewState } from "./types"

const initialState: TripReviewState = {
    reviews: []
}

export const tripReviewsReducer = (state = initialState, action: TripReviewActionTypes) => {
    switch (action.type) {
        case FETCH_TRIPS_REVIEWS:
            return { ...state, adverts: action.payload }
        default:
            return state;
    }
}