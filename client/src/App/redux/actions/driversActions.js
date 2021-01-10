import service from "../../services/index"
import { FETCH_DRIVERS, ADD_DRIVER, ADD_LOCAL_DRIVER } from "./Types"

export const fetchDrivers = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.DriverService.fetchAllDrivers()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changeDriversList(res.data.drivers));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export const addDriver = (driver) => {
    return dispatch => {
        service.DriverService.addDriver(driver)
            .then((res) => {
                console.log(res.data)
                dispatch(addDriverSuccesss(true));
            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeDriversList(data) {
    return {
        type: FETCH_DRIVERS,
        payload: { drivers: data }
    }
}

export const deleteTrip = (tripId) => {
    return {
        type: 'DELETE_TRIP',
        payload: { id: tripId }
    }
}

export function addDriverSuccesss(val) {
    console.log({ MsgSuccess: val })
    return {
        type: ADD_DRIVER,
        payload: { isAdded: val }
    }
}

export const fetchSingleTrip = (tripId) => {
    return {
        type: 'FETCH_SINGLE_TRIP',
        payload: { id: tripId }
    }
}

export const addLocalDriver = (_driver) => {
    return {
        type: ADD_LOCAL_DRIVER,
        payload: { localDriver: _driver }
    }
}

export const attachVehicleToDriver = (truckid, driverid) => {
    return dispatch => {
        service.DriverService.addVehicleToDriver(truckid, driverid)
            .then((res) => {
                console.log(res.data)
                dispatch(addDriverSuccesss(true));
            }).catch((err) => {
                console.log(err);
            })
    };
}