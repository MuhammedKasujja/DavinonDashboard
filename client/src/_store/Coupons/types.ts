export const SAVE_COUPON = "SAVE_COUPON"
export const FETCH_ALL_COUPONS = "FETCH_ALL_COUPONS"
export const DELETE_COUPON = "DELETE_COUPON"

export interface Coupon {
    id?:string
    code?: string
    discount: number
    activtionDate?: string
    expiryDate?: string
    usageLimit: number
    usedBy?: number
    status: string //= 'enabled' | 'disabled'
    intendedUsers?:string[] // array of users{ids}
}

export interface CouponState{
    coupons:Array<Coupon>
}

export interface FetchAllCouponsAction{
     type: typeof FETCH_ALL_COUPONS
     payload:Array<Coupon>
}

export interface SaveCouponsAction{
    type: typeof SAVE_COUPON
    payload:Coupon
}

export type CouponActionTypes = FetchAllCouponsAction | SaveCouponsAction