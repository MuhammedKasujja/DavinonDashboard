import {FETCH_BRANDS} from "../actions/Types"

const initState = {
    brands: []
}

export const brandsReducer = (state = initState, action) => {
    switch (action.type) {
        case FETCH_BRANDS:
            return { ...state, brands: action.payload.brands }
        default:
            return state;
    }
}