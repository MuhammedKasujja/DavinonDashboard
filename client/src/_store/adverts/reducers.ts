import { FETCH_ALL_ADVERTS, SAVE_ADVERT, AdvertsActionTypes, AdvertsState } from "./types"

const initialState: AdvertsState = {
    adverts: []
}

export const advertsReducer = (state = initialState, action: AdvertsActionTypes) => {
    switch (action.type) {
        case SAVE_ADVERT:
            return {
                ...state,
                adverts: [...state.adverts, action.payload]
            }
        case FETCH_ALL_ADVERTS:
            return { ...state, adverts: action.payload }
        default:
            return state;
    }
}