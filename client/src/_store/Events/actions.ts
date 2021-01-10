import { Dispatch } from "redux";
import { Driver } from "_store/driver/types";
import {
    FETCH_TRIP_NOTIFICATIONS,
    NotificationActionTypes,
    Notification,
    FETCH_DRIVER_NOTIFICATIONS,
    FETCH_PAYMENTS_NOTIFICATION
} from "./types"
const url = process.env.REACT_APP_BASE_URL

export const fetchTripNotification = () => async (dispatch: Dispatch<NotificationActionTypes>) => {
    const eventStream = new EventSource(`${url}/trips/stream/`)
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
    const eventStream = new EventSource(`${url}/payments/stream`)
    eventStream.addEventListener("NewPayment", ((event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log({ 'Payments': data.payments });
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

export function addNotifications(notifications: Notification): NotificationActionTypes {
    // console.log({ 'Tot': notifications })
    return {
        type: FETCH_TRIP_NOTIFICATIONS,
        payload: notifications
    }
}

