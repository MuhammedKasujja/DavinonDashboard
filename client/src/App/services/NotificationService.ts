import { restConnector } from "../connectors/Axios-connector";
const token = localStorage.getItem('token')

class NotificationService {
    markPaymentsNotificationsAsRead(notifictionIds: Array<string>) {
        return restConnector({
            url: `/payments/notifications/read`,
            headers: { Authorization: `Bearer ${token}` },
            method: "POST",
            data: notifictionIds
        })
    }
    // admin
    markTripNotificationsAsRead(notifictionIds: Array<string>) {
        return restConnector({
            url: `/trips/notifications/read`,
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            data: notifictionIds
        });
    }

}

export default new NotificationService();
