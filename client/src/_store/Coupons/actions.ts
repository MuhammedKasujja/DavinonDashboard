import { Dispatch } from "redux"
import service from "../../App/services/index";
import { Coupon, CouponActionTypes, FETCH_ALL_COUPONS, SAVE_COUPON } from "./types"

export const fetchCoupons = () => async (dispatch: Dispatch<CouponActionTypes>) => {
    const res = await service.PassengerService.fetchAllPassengers()
    console.log({'Coupons':res.data.coupons})
    dispatch({
        type: FETCH_ALL_COUPONS,
        payload: res.data.passengers
    })
}

export const saveCoupon = (coupon: Coupon) => async (dispatch: Dispatch<CouponActionTypes>) => {
    const res = await service.PassengerService.addPassenger(coupon)
    dispatch( {
        type: SAVE_COUPON,
        payload: coupon
    })
}
