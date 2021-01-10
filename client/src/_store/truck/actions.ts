import { Dispatch } from "redux"
import {
    Vehicle, VehicleActionTypes, FETCH_CARS, ADD_CAR, ADD_LOCAL_CAR,
    FETCH_TONNAGES, FETCH_TRUCK_BODIES, FETCH_VEHICLE_TYPES
} from "./types"
import service from "../../App/services/index";

export const FetchTrucks = () => async (dispatch: Dispatch<VehicleActionTypes>) => {
    const res = await service.TruckService.fetchAllTrucks()
    console.log({ 'vehicles': res.data['trucks'] })
    dispatch({
        type: FETCH_CARS,
        payload: res.data['trucks']
    })
    // dispatch(saveVehicle({}))
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
    // console.log({'vehicle':vehicle.entries()})
    for (var p of vehicle) {
        console.log({'DataForm':p});
      }
    const res = await service.TruckService.addTruck(vehicle);
    console.log({ 'TruckServiceSaved': res.data })
    // dispatch({
    //     type: ADD_CAR,
    //     payload: vehicle
    // })
}

export function AddLocalVehicle(vehicle: Vehicle): VehicleActionTypes {
    return {
        type: ADD_LOCAL_CAR,
        payload: vehicle
    }
}

export const fetchCarTypes = () => async (dispatch: Dispatch<VehicleActionTypes>) => {
    service.TruckService.fetchVehicleTypes()
        .then((res) => {
            // console.log({'ReduxDispatchfetchVehicleTypes':res.data.vehicleTypes})
            dispatch({
                type: FETCH_VEHICLE_TYPES,
                payload: res.data.vehicleTypes
            })

        }).catch((err) => {
            console.log(err);
        })
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