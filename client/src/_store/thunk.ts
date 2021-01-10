import { Action } from 'redux'
import { fetchDrivers } from './driver/actions'
import { RootStore } from './store'
import { ThunkAction } from 'redux-thunk'
import service from "../App/services/index";

export const fetchDriversApi = (
): ThunkAction<void, RootStore, unknown, Action<string>> => async dispatch => {
    const drivers = await service.DriverService.fetchAllDrivers()
    dispatch(
        fetchDrivers(drivers.data['drivers'])
    )
}
