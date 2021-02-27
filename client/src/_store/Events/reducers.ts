import { FETCH_TRIP_NOTIFICATIONS, FETCH_DRIVER_NOTIFICATIONS, NotificationState, NotificationActionTypes, FETCH_PAYMENTS_NOTIFICATION } from "./types"

const initialState: NotificationState = {
    notifications: [],
    activeDrivers: [],
    payments: []

}

export function notificationReducer(state = initialState, action: NotificationActionTypes): NotificationState {
    switch (action.type) {
        case FETCH_TRIP_NOTIFICATIONS:
            return { ...state, notifications: action.payload }
        case FETCH_DRIVER_NOTIFICATIONS:
            return { ...state, activeDrivers: action.payload }
        case FETCH_PAYMENTS_NOTIFICATION:
            return { ...state, payments: action.payload }
        default:
            return state;
    }

}