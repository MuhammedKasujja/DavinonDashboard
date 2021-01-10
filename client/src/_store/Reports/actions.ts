import { Dispatch } from "redux"
import service from "../../App/services/index";
import { ReportsActionTypes, FETCH_TRIPS_PAYMENTS } from "../../_types/Report"

export const fetchTripsPayments = () => async (dispatch: Dispatch<ReportsActionTypes>) => {
    const res = await service.ReportsService.fetchTripPayments()
    // console.log({ 'payments': res.data })
    dispatch({
        type: FETCH_TRIPS_PAYMENTS,
        payload: res.data
    })
}

