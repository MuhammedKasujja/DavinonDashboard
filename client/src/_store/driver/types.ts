import { Photo } from "_store/photo";
import { Position } from "_store/trips/types";
import { Vehicle } from "_store/truck/types";
export const FETCH_DRIVERS = 'FETCH_DRIVERS'
export const ADD_LOCAL_DRIVER = 'ADD_LOCAL_DRIVER'
export const ADD_DRIVER = 'ADD_DRIVER'
export const FETCH_ALL_DRIVERS = 'FETCH_ALL_DRIVERS'

export interface Driver extends Photo {
    id?: string,
    firstname?: string,
    lastname?: string,
    name: string,
    email: string,
    telephone?: string,
    nationalId?: string,
    gender?: string,
    status: number,
    isOnline: boolean
    trucks?:Vehicle[]
    city:string
    oneSignalPlayerID:string
    nin:string
    birthday?:string
    charisma:number
    location?:Position
    available?:boolean
    createdOn?:number
}

export interface DriverState {
    drivers: Driver[],
    allDrivers: any,
    localDriver: Driver | undefined
}

export interface FetchDriversAction {
    type: typeof FETCH_DRIVERS,
    payload: Driver[]
}

export interface AddDriver {
    type: typeof ADD_DRIVER,
    payload: Driver
}

export interface FetchAllDriversAction {
    type: typeof FETCH_ALL_DRIVERS,
    payload: Driver[]
}

export interface AddLocalDriver {
    type: typeof ADD_LOCAL_DRIVER,
    payload: Driver | undefined
}

export type DriverActionTypes = FetchDriversAction | AddDriver | AddLocalDriver | FetchAllDriversAction

