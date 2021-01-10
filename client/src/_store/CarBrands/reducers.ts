import {FETCH_BRANDS, CarBrandsActionTypes, CarBrandsState} from "./types"

const initialState: CarBrandsState = {
    brands: []
}

export const brandsReducer = (state = initialState, action:CarBrandsActionTypes) => {
    switch (action.type) {
        case FETCH_BRANDS:
            return { ...state, brands: action.payload }
        default:
            return state;
    }
}