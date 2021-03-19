import { Dispatch } from "redux"
import service from "../../App/services/index";
import { Driver, DriverActionTypes, FETCH_ALL_DRIVERS, ADD_DRIVER, ADD_LOCAL_DRIVER, FETCH_DRIVERS } from "./types"

export const GetDrivers = () => async (dispatch: Dispatch<DriverActionTypes>) => {
    const res = await service.DriverService.fetchAllDrivers()
    dispatch({
        type: FETCH_DRIVERS,
        payload: res.data.drivers
    })
}

export function fetchDrivers(drivers: Driver[]): DriverActionTypes {
    console.log({ 'Tot': drivers })
    console.log(drivers.length)
    return {
        type: FETCH_DRIVERS,
        payload: drivers
    }
}

export const fetchAllDrivers = () => async (dispatch: Dispatch<DriverActionTypes>) => {
    const res = await service.DriverService.fetchAllDrivers()
    // console.log({'ResDrivers':res.data.drivers})
    dispatch({
        type: FETCH_ALL_DRIVERS,
        payload: res.data.drivers
    })
}

export const attachVehicleToDriver = (truckid: string, driverid: string) => async (dispatch: Dispatch<DriverActionTypes>) => {
    service.DriverService.addVehicleToDriver(truckid, driverid)
        .then((res) => {
            console.log(res.data)
            // dispatch(addDriverSuccesss(true));
        }).catch((err) => {
            console.log(err);
        })
}

export const saveDriver = (driver: any) => async (dispatch: Dispatch<DriverActionTypes>) => {
    service.DriverService.addDriver(driver)
        .then((res) => {
            console.log(res.data)
            // dispatch(addDriverSuccesss(true));
        }).catch((err) => {
            console.log(err);
        })
}

export function AddDrivers(driver: Driver): DriverActionTypes {
    return {
        type: ADD_DRIVER,
        payload: driver
    }
}

export function AddLocalDriver(driver: Driver | undefined): DriverActionTypes {
    return {
        type: ADD_LOCAL_DRIVER,
        payload: driver
    }
}