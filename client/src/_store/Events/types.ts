import { Driver } from "_store/driver/types"
import { TripPayment } from "_types/Report"

export const FETCH_TRIP_NOTIFICATIONS = "FETCH_TRIP_NOTIFICATIONS"
export const FETCH_DRIVER_NOTIFICATIONS = "FETCH_DRIVER_NOTIFICATIONS"
export const FETCH_PAYMENTS_NOTIFICATION = "FETCH_PAYMENTS_NOTIFICATION"

export type NotificationType = 'trip' | 'payment'

export interface PaymentNotification {
    paymentId: string,
    seers: Array<string>,
    amount: number,
    id: string,
    createdAt: string,
    tripCode: string,
    paymentMethod: string
}

export interface TripNotification {
    id: string,
    type: number
    createdAt: string,
    tripCode: string,
    destinationAddress: string
    originAddress: string
    message: string
    seers: Array<string>
    amount: number
}

export interface NotificationState {
    notifications: TripNotification[],
    activeDrivers: Driver[]
    payments: PaymentNotification[]
}

export interface FetchNotificationAction {
    type: typeof FETCH_TRIP_NOTIFICATIONS,
    payload: TripNotification[]
}
export interface FetchPaymentNotificationAction {
    type: typeof FETCH_PAYMENTS_NOTIFICATION,
    payload: PaymentNotification[]
}
export interface FetchDriverNotificationAction {
    type: typeof FETCH_DRIVER_NOTIFICATIONS,
    payload: Driver[]
}

export type NotificationActionTypes = FetchNotificationAction | FetchDriverNotificationAction | FetchPaymentNotificationAction