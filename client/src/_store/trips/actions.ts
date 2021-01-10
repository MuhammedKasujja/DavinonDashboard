import { Dispatch } from "redux"
import service from "../../App/services/index";
import { Trip, TripActionTypes, FETCH_TRIPS, ADD_LOCAL_TRIP, ADD_TRIP } from "./types"

export const fetchTrips = () => async (dispatch: Dispatch<TripActionTypes>) => {
    const res = await service.TripService.fetchAllTrips()
    console.log({ "FetchTrips": res.data.trips })
    dispatch({
        type: FETCH_TRIPS,
        payload: res.data.trips
    })
}

export const AddTrip = (trip: Trip) => async (dispatch: Dispatch<TripActionTypes>) => {
    dispatch({
        type: ADD_TRIP,
        payload: trip
    })
}

export const AddLocalTrip = (trip: Trip | undefined) => (dispatch: Dispatch<TripActionTypes>) => {
    dispatch({
        type: ADD_LOCAL_TRIP,
        payload: trip
    })
}