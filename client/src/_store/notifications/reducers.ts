import { SEND_NOTIFICATION, FETCH_ALL_NOTIFICATIONS, PushNotificationActionTypes, PushNotificationState } from "./types"

const initialState: PushNotificationState = {
    notifications: []
}

export const pushNotificationsReducer = (state = initialState, action: PushNotificationActionTypes) => {
    switch (action.type) {
        case SEND_NOTIFICATION:
            return {
                ...state,
                notifications: [...state.notifications, action.payload]
            }
        case FETCH_ALL_NOTIFICATIONS:
            return { ...state, adverts: action.payload }
        default:
            return state;
    }
}