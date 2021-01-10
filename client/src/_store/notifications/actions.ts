import { Dispatch } from "redux"
import service from "../../App/services/index";
import { PushNotification, PushNotificationActionTypes, FETCH_ALL_NOTIFICATIONS, SEND_NOTIFICATION } from "./types"

export const fetchPushNotifications = () => async (dispatch: Dispatch<PushNotificationActionTypes>) => {
    const res = await service.PassengerService.fetchAllPassengers()
    console.log({'Adverts':res.data.adverts})
    dispatch({
        type: FETCH_ALL_NOTIFICATIONS,
        payload: res.data.passengers
    })
}

export const sendNotification = (notification: PushNotification) => async (dispatch: Dispatch<PushNotificationActionTypes>) => {
    const res = await service.PassengerService.addPassenger(notification)
    dispatch( {
        type: SEND_NOTIFICATION,
        payload: notification
    })
}
