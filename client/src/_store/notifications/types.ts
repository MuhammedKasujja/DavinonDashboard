export const SEND_NOTIFICATION = "SEND_NOTIFICATION"
export const FETCH_ALL_NOTIFICATIONS = "FETCH_ALL_NOTIFICATIONS"
export const DELETE_NOTIFICATION = "DELETE_NOTIFICATION"

export interface PushNotification {
    id:string
    message: string
    createdOn: number
    recieverType:number //= 'drivers' | 'clients'
    intendedUsers:string[] 
}

export interface PushNotificationState{
    notifications:Array<PushNotification>
}

export interface FetchAllPushNotificationsAction{
     type: typeof FETCH_ALL_NOTIFICATIONS
     payload:Array<PushNotification>
}

export interface SavePushNotificationAction{
    type: typeof SEND_NOTIFICATION
    payload:PushNotification
}

export type PushNotificationActionTypes = FetchAllPushNotificationsAction | SavePushNotificationAction