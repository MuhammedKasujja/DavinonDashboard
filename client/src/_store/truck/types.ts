import { Photo } from "_store/photo"

export default {}
export const FETCH_CARS = "FETCH_CARS"
export const FETCH_TRUCK_BODIES = "FETCH_TRUCK_BODIES"
export const FETCH_VEHICLE_TYPES = "FETCH_VEHICLE_TYPES"
export const FETCH_TONNAGES = "FETCH_TONNAGES"
export const ADD_CAR = "ADD_CAR"
export const ADD_LOCAL_CAR = "ADD_LOCAL_CAR"

export interface Vehicle extends Photo {
    id?: string,
    brand: string,
    model: string,
    type: string,
    driverId:string | null
    seats?: string,
    cylinders?: string,
    gearbox?: string,
    fuel: string,
    year: string,
    color: string,
    interior_color?: string,
    licencePlate: string,
    tankCapacity?: string,
    driveTrain: string,
    tonnage: string,
    truckBody: string,
    status: boolean,
}

export interface CarOption {
    name: string,
    options: string[]
}

export interface CarType {
    id: string
    name: string
    types: CarOption[]
    rank: number
}

export interface Tonnage {
    id: string
    drive_type: string[]
    tonnage_max: number
    tonnage_min: number
    tonnage: string
    tonnage_id: string
    rank: number
}

export interface TruckBody {
    id: string
    name: string
    rank: number
}

export interface VehicleState {
    vehicles: Vehicle[]
    vehicleTypes: CarType[]
    tonnages: Tonnage[]
    truckBodies: TruckBody[]
}

export interface FetchVehiclesAction {
    type: typeof FETCH_CARS,
    payload: Vehicle[]
}

export interface AddVehicleAction {
    type: typeof ADD_CAR,
    payload: Vehicle
}

export interface AddLocalVehicle {
    type: typeof ADD_LOCAL_CAR,
    payload: Vehicle
}

export interface FetchCarTypesAction {
    type: typeof FETCH_VEHICLE_TYPES,
    payload: CarType[]
}

export interface FetchTruckBodiesAction {
    type: typeof FETCH_TRUCK_BODIES,
    payload: TruckBody[]
}

export interface FetchTruckTonnagesAction {
    type: typeof FETCH_TONNAGES,
    payload: Tonnage[]
}

export type VehicleActionTypes = FetchVehiclesAction | AddVehicleAction |
    AddLocalVehicle | FetchCarTypesAction | FetchTruckBodiesAction | FetchTruckTonnagesAction
