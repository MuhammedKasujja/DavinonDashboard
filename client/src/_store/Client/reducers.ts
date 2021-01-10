import { ClientState, ClientActionTypes, FETCH_CLIENTS, ADD_LOCAL_CLIENT, ADD_CLIENT } from "./types"

const initialState: ClientState = {
    clients: []
}

export function clientReducer(state = initialState, action: ClientActionTypes): ClientState {
    switch (action.type) {
        case FETCH_CLIENTS:
            return { ...state, clients: action.payload }
        case ADD_CLIENT:
            return {
                ...state,
                clients: [...state.clients, action.payload]
            }
        case ADD_LOCAL_CLIENT:
            return {
                ...state,
                clients: [...state.clients, action.payload]
            }
        default:
            return state;
    }

}