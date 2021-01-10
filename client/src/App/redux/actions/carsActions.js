import service from "../../services/index"
import { FETCH_CARS, FETCH_TONNAGES, FETCH_TRUCK_BODIES, FETCH_VEHICLE_TYPES } from "./Types"

export const fetchCars = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.TruckService.fetchAllTrucks()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changeCarsList(res.data.trucks));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeCarsList(data) {
    return {
        type: FETCH_CARS,
        payload: { trucks: data }
    }
}

export const fetchCarTypes = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.TruckService.fetchVehicleTypes()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch({
                    type: FETCH_VEHICLE_TYPES,
                    payload:res.data.vehicleTypes
                })

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeCarTypesList(data) {
    return {
        type: FETCH_VEHICLE_TYPES,
        payload: { vehicleTypes: data }
    }
}

export const fetchTruckBodies = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.TruckService.fetchTruckBodies()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changeTruckBodyList(res.data.truckBodies));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeTruckBodyList(data) {
    return {
        type: FETCH_TRUCK_BODIES,
        payload: { truckBodies: data }
    }
}

export const fetchTruckTonnages = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.TruckService.fetchTruckTonnages()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changeTruckTonnageList(res.data.tonnages));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeTruckTonnageList(data) {
    return {
        type: FETCH_TONNAGES,
        payload: { tonnages: data }
    }
}

export const addData = () => {
    
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.TruckService.addData()
            .then((res) => {
                console.log(res)
                dispatch(changeTruckTonnageList(null));
            }).catch((err) => {
                console.log(err);
            })
    };
}

