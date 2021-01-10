import { Client } from "_store/Client/types"
import { Driver } from "_store/driver/types"

export const FETCH_TRIPS = "FETCH_TRIPS"
export const ADD_TRIP = "ADD_TRIP"
export const ADD_LOCAL_TRIP = "ADD_LOCAL_TRIP"
export const DELETE_TRIP = "DELETE_TRIP" 

export interface Position {
    lat: number,
    lng: number,
    name: string
}

export interface Waypoint {
    name: string,
    distance: string,
    duration: string,
    origin: Position,
    destination: Position
}

export interface Trip {
    id: string
    code: string
    distance: string
    duration: string
    waypoints: Waypoint[]
    tripStartTime: Date
    tripEndTime: Date
    passenger: Client
    driver?: Driver
    originAddress: string
    driverAddress: string
    estimatedCost: number
    driverLongitude: number
    driverLatitude: number
    originLatitude: number
    originLongitude: number
    destinationAddress: string
    destinationLatitude: string
    destinationLongitude: number
    status: number
    type: number
    fuel_tank?:string
    dates?:any
    drive_type?:string
    range?:string
    capacity?:string
    paymentMethod: string
    position: any
    require_loaders:string
    vehicle_model:string
    vehicle:string
    createdOn: Date
    updatedOn: Date
    origin: Position
    destination: Position
}
type state = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface TripInstantPassenger extends Trip {

}

export interface TripInstantCargo extends Trip {

}

export interface TripScheduledPassenger extends Trip {

}

export interface TripScheduledCargo extends Trip {

}

export interface TripState {
    trips: Trip[]
    localTrip:Trip | undefined
}

export interface FetchTripsAction {
    type: typeof FETCH_TRIPS,
    payload: Trip[]
}

export interface AddTrip {
    type: typeof ADD_TRIP,
    payload: Trip
}

export interface AddLocalTrip {
    type: typeof ADD_LOCAL_TRIP,
    payload: Trip | undefined
}

export interface DeleteTrip {
    type: typeof DELETE_TRIP,
    payload: Trip
}

export type TripActionTypes = FetchTripsAction | AddTrip | AddLocalTrip | DeleteTrip
