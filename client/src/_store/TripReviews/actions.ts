import { Dispatch } from "redux"
import service from "../../App/services/index";
import { TripReviewActionTypes, FETCH_TRIPS_REVIEWS } from "./types"

export const fetchTripsReviews = () => async (dispatch: Dispatch<TripReviewActionTypes>) => {
    const res = await service.TripService.fetchTripsReviews()
    dispatch({
        type: FETCH_TRIPS_REVIEWS,
        payload: res.data
    })
}

