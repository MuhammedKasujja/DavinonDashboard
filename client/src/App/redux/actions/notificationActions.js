import { ADD_NOTIFICATION } from "./Types"

export function newTripsNotification(data) {
    console.log(data)
    return {
        type: ADD_NOTIFICATION,
        payload: { trips: data }
    }
}

