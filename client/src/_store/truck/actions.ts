import { Dispatch } from "redux"
import {
    Vehicle, VehicleActionTypes, FETCH_CARS, ADD_CAR, ADD_LOCAL_CAR,
    FETCH_TONNAGES, FETCH_TRUCK_BODIES, FETCH_VEHICLE_TYPES
} from "./types"
import service from "../../App/services/index";
import { ERROR, LOADING, SUCCESS } from "_types/AppSettings";

export const FetchTrucks = () => async (dispatch: Dispatch<VehicleActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: true
    })
    try {
        const res = await service.TruckService.fetchAllTrucks()
        console.log({ 'vehicles': res.data['trucks'] })
        dispatch({
            type: FETCH_CARS,
            payload: res.data['trucks']
        })
    } catch (error) {
        console.log({ NetworkError: error.response.data.message })
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
    } finally {
        dispatch({
            type: LOADING,
            payload: false
        })
    }
}

export function fetchVehicles(vehicles: Vehicle[]): VehicleActionTypes {
    console.log({ 'Tot': vehicles })
    console.log(vehicles.length)
    return {
        type: FETCH_CARS,
        payload: vehicles
    }
}

export const saveVehicle = (vehicle: any) => async (dispatch: Dispatch<VehicleActionTypes>) => {

    console.log({ 'vehicle': vehicle.entries() })
    // for (var p of vehicle) {
    //     console.log({'DataForm':p});
    //   }
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: true
    })
    try {
        const res = await service.TruckService.addTruck(vehicle);
        console.log({ 'TruckServiceSaved': res.data })
        dispatch({
            type: SUCCESS,
            payload: 'Saved Successfully'
        })
    } catch (error) {
        console.log({ NetworkError: error.response.data.message })
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
    } finally {
        dispatch({
            type: LOADING,
            payload: false
        })
    }
}

export function AddLocalVehicle(vehicle: Vehicle): VehicleActionTypes {
    return {
        type: ADD_LOCAL_CAR,
        payload: vehicle
    }
}

export const fetchCarTypes = () => async (dispatch: Dispatch<VehicleActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: true
    })

    try {
        const res = await service.TruckService.fetchVehicleTypes();
        dispatch({
            type: FETCH_VEHICLE_TYPES,
            payload: res.data.vehicleTypes
        })
    } catch (error) {
        console.log({ NetworkError: error.response.data.message })
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
        // showError(error)
    } finally {
        dispatch({
            type: LOADING,
            payload: false
        })
    }
}

export const fetchVehicleDetails = (truckId: string) => async (dispatch: Dispatch<VehicleActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: true
    })
    try {
        const res = await service.TruckService.fetchSingleTruck(truckId);
        // console.log({'ReduxDispatch':res.data.trips})
        dispatch({
            type: ADD_LOCAL_CAR,
            payload: res.data.truck
        })

    } catch (error) {
        console.log({ NetworkError: error.response.data.message })
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
    } finally {
        dispatch({
            type: LOADING,
            payload: false
        })
    }
}

export const fetchTruckBodies = () => async (dispatch: Dispatch<VehicleActionTypes>) => {
    service.TruckService.fetchTruckBodies()
        .then((res) => {
            // console.log({'ReduxDispatch':res.data.trips})
            dispatch({
                type: FETCH_TRUCK_BODIES,
                payload: res.data.truckBodies
            })

        }).catch((err) => {
            console.log(err);
        })
}

export const fetchTruckTonnages = () => async (dispatch: Dispatch<VehicleActionTypes>) => {
    service.TruckService.fetchTruckTonnages()
        .then((res) => {
            // console.log({'ReduxDispatch':res.data.trips})
            dispatch({
                type: FETCH_TONNAGES,
                payload: res.data.tonnages
            })

        }).catch((err) => {
            console.log(err);
        })
}

export const deleteVehicle = (truckId: string) => async (dispatch: Dispatch<VehicleActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: LOADING,
        payload: true
    })
    try {
        const res = await service.TruckService.deleteTruck(truckId);
        console.log({'ReduxDispatchMessage':res.data})
        dispatch({
            type: SUCCESS,
            payload: res.data.message
        })

    } catch (error) {
        console.log({ NetworkError: error.response.data.message })
        dispatch({
            type: ERROR,
            payload: error.response.data.message
        })
    } finally {
        dispatch({
            type: LOADING,
            payload: false
        })
    }
}

export const clearError = () => (dispatch: Dispatch<VehicleActionTypes>) => {
    dispatch({
        type: ERROR,
        payload: undefined
    })
    dispatch({
        type: SUCCESS,
        payload: undefined
    })
    dispatch({
        type: ADD_LOCAL_CAR,
        payload: undefined
    })
}