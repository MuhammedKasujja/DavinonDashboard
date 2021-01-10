import { Photo } from "_store/photo";
export const FETCH_CLIENTS = "FETCH_CLIENTS"
export const ADD_CLIENT = "ADD_CLIENT"
export const ADD_LOCAL_CLIENT = "ADD_LOCAL_CLIENT"

export interface Client extends Photo {
    id?: string
    code: string
    name: string
    email: string
    age: number
    createdOn: Date
    updatedOn: Date
    status: boolean
    telephone: string
}

export interface ClientState{
    clients:Client[]
}

export interface FetchClientsAction{
    type:typeof FETCH_CLIENTS,
    payload:Client[]
}

export interface AddClient{
    type:typeof ADD_CLIENT,
    payload:Client
}

export interface AddLocalClient{
    type:typeof ADD_LOCAL_CLIENT,
    payload:Client
}

export type ClientActionTypes = FetchClientsAction | AddClient | AddLocalClient