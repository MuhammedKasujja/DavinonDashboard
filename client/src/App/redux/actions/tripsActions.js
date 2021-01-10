import service from "../../services/index"

export const fetchTrips = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.TripService.fetchAllTrips()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changeTripsList(res.data.trips));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeTripsList(data) {
    return {
        type: "FETCH_TRIPS",
        payload: { trips: data }
    }
}

export const deleteTrip = (tripId) => {
    return {
        type: 'DELETE_TRIP',
        payload: { id: tripId }
    }
}

export const addTrip = (trip) => {
    return {
        type: 'ADD_TRIP',
        payload: { id: trip }
    }
}

export const fetchSingleTrip = (tripId) => {
    return {
        type: 'FETCH_SINGLE_TRIP',
        payload: { id: tripId }
    }
}
