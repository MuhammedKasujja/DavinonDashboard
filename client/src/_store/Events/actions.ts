import { Dispatch } from "redux";
import { Driver } from "_store/driver/types";
import service from "../../App/services/index";
import {
    FETCH_TRIP_NOTIFICATIONS,
    NotificationActionTypes,
    TripNotification,
    FETCH_DRIVER_NOTIFICATIONS,
    FETCH_PAYMENTS_NOTIFICATION
} from "./types"
const url = process.env.REACT_APP_BASE_URL
const loginDate = localStorage.getItem('lastLoginDate')
const userId = localStorage.getItem('uid')

///// listen to TripNotifications document
export const fetchTripNotification = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
    const eventStream = new EventSource(`${url}/trips/notifications/${userId}/${loginDate}`)
    eventStream.addEventListener("NewNotification", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log({ 'Notification': data.notifications });
        dispatch(addNotifications(data.notifications))
    }) as EventListener);
}


///// listen to the trips document
export const fetchTripNotificationOld = () => async (dispatch: Dispatch<NotificationActionTypes>) => {

    const eventStream = new EventSource(`${url}/trips/stream/${loginDate}`)
    eventStream.addEventListener("tripStateAdded", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        dispatch(addNotifications(data))
        //do something
    }) as EventListener);
    eventStream.addEventListener("tripStateModified", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        dispatch(addNotifications(data))
        //do something
    }) as EventListener);
    eventStream.addEventListener("tripStateRemoved", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        dispatch(addNotifications(data))
    }) as EventListener);
}
export const fetchActiveDriversNotification = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
    const eventStream = new EventSource(`${url}/drivers/active`)
    eventStream.addEventListener("ActiveDrivers", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        dispatch(addActiveDriversNotifications(data.drivers))
    }) as EventListener);
    eventStream.addEventListener("ModifiedDrivers", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        // console.log(data);
        dispatch(addActiveDriversNotifications(data.drivers))
    }) as EventListener);
    eventStream.addEventListener("RemovedDrivers", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        dispatch(addActiveDriversNotifications(data.drivers))
    }) as EventListener);
}

export const fetchNewPaymentsNotification = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
    // const eventStream = new EventSource(`${url}/payments/stream/ZZ1XBw5nQKOTBTNA6oPCTonapvA3`)
    const eventStream = new EventSource(`${url}/payments/notifications/${userId}/${loginDate}`)
    eventStream.addEventListener("NewPayment", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log({ 'Payments': data });
        dispatch({
            type: FETCH_PAYMENTS_NOTIFICATION,
            payload: data.payments
        })
    }) as EventListener);
}

export function addActiveDriversNotifications(drivers: Driver[]): NotificationActionTypes {
    console.log({ 'TotDrivers': drivers })
    return {
        type: FETCH_DRIVER_NOTIFICATIONS,
        payload: drivers
    }
}

export function addNotifications(notifications: TripNotification[]): NotificationActionTypes {
    // console.log({ 'Tot': notifications })
    return {
        type: FETCH_TRIP_NOTIFICATIONS,
        payload: notifications
    }
}

export const makePaymentsNotificationsAsRead = (notificationsId: Array<string>) =>
    async (dispatch: Dispatch<NotificationActionTypes>) => {
        const res = await service.NotificationService.markPaymentsNotificationsAsRead(notificationsId)
        console.log(res)
    }

export const markTripNotificationsAsRead = (notificationsId: Array<string>) =>
    async (dispatch: Dispatch<NotificationActionTypes>) => {
        const res = await service.NotificationService.markTripNotificationsAsRead(notificationsId)
        console.log(res)
    }