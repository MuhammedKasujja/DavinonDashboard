export const SAVE_REPORT = "SAVE_REPORT"
export const FETCH_TRIPS_PAYMENTS = "FETCH_TRIPS_PAYMENTS"
export const FETCH_GRAND_PAYMENTS = "FETCH_GRAND_PAYMENTS"


export interface ReportsState {
    tripPayments: TripPayment[]
    totalPayments:number
}

export interface SaveReportAction {
    type: typeof SAVE_REPORT
    payload: TripPayment | undefined
}

export interface FetchTripsPaymentsAction {
    type: typeof FETCH_TRIPS_PAYMENTS
    payload: TripPayment[]
}

export interface FetchGrandPaymentsAction {
    type: typeof FETCH_GRAND_PAYMENTS
    payload: number
}

export type ReportsActionTypes = SaveReportAction | FetchTripsPaymentsAction | FetchGrandPaymentsAction

export interface TripPayment {
    id: string
    clientId: string
    clientName: string
    amount: number
    tripId: string
    createdOn: string,
    origin: string,
    destination: string,
    paymentMethod: string,
    balance: number
}