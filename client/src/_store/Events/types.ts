import { Driver } from "_store/driver/types"
import { TripPayment } from "_types/Report"

export const FETCH_TRIP_NOTIFICATIONS = "FETCH_TRIP_NOTIFICATIONS"
export const FETCH_DRIVER_NOTIFICATIONS = "FETCH_DRIVER_NOTIFICATIONS"
export const FETCH_PAYMENTS_NOTIFICATION = "FETCH_PAYMENTS_NOTIFICATION"

export interface Notification {
    type: string
    message: string
    state: string
    total: number
}

export interface NotificationState {
    notifications: Notification,
    activeDrivers: Driver[]
    payments:TripPayment[]
}

export interface FetchNotificationAction {
    type: typeof FETCH_TRIP_NOTIFICATIONS,
    payload: Notification
}
export interface FetchPaymentNotificationAction {
    type: typeof FETCH_PAYMENTS_NOTIFICATION,
    payload: TripPayment[]
}
export interface FetchDriverNotificationAction {
    type: typeof FETCH_DRIVER_NOTIFICATIONS,
    payload: Driver[]
}

export type NotificationActionTypes = FetchNotificationAction | FetchDriverNotificationAction | FetchPaymentNotificationAction