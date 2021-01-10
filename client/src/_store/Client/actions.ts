import { Dispatch } from "redux"
import service from "../../App/services/index";
import { Client, ClientActionTypes, FETCH_CLIENTS, ADD_LOCAL_CLIENT, ADD_CLIENT } from "./types"

export const fetchClients = () => async (dispatch: Dispatch<ClientActionTypes>) => {
    const res = await service.PassengerService.fetchAllPassengers()
    console.log({'Clients':res.data.passengers})
    dispatch({
        type: FETCH_CLIENTS,
        payload: res.data.passengers
    })
}

export const AddClient = (client: Client) => async (dispatch: Dispatch<ClientActionTypes>) => {
    const res = await service.PassengerService.addPassenger(client)
    dispatch( {
        type: ADD_CLIENT,
        payload: client
    })
}

export function AddLocalClient(client: Client): ClientActionTypes {
    return {
        type: ADD_LOCAL_CLIENT,
        payload: client
    }
}