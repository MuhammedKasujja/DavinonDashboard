import { FETCH_ALL_COUPONS, CouponActionTypes, CouponState, SAVE_COUPON } from "./types"

const initialState: CouponState = {
    coupons: []
}

export const couponsReducer = (state = initialState, action: CouponActionTypes) => {
    switch (action.type) {
        case SAVE_COUPON:
            return {
                ...state,
                coupons: [...state.coupons, action.payload]
            }
        case FETCH_ALL_COUPONS:
            return { ...state, coupons: action.payload }
        default:
            return state;
    }
}