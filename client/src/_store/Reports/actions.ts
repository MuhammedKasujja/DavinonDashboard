import { Dispatch } from "redux"
import service from "../../App/services/index";
import { ReportsActionTypes, FETCH_TRIPS_PAYMENTS, FETCH_GRAND_PAYMENTS } from "../../_types/Report"

export const fetchTripsPayments = () => async (dispatch: Dispatch<ReportsActionTypes>) => {
    const res = await service.ReportsService.fetchTripPayments()
    // console.log({ 'payments': res.data })
    dispatch({
        type: FETCH_TRIPS_PAYMENTS,
        payload: res.data
    })
}

export const fetchGrandTotalPayments = () => async (dispatch: Dispatch<ReportsActionTypes>) => {
    const res = await service.ReportsService.fetchGrandTotalPayments()
    console.log({ 'TotalPay': res.data })
    dispatch({
        type: FETCH_GRAND_PAYMENTS,
        payload: res.data
    })
}

