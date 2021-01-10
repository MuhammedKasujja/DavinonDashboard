export const FETCH_BRANDS = "FETCH_BRANDS"
export const ADD_CAR_BRAND = "ADD_CAR_BRAND"
export const SAVE_CAR_MODEL = "SAVE_CAR_MODEL"

export interface CarModel {
    name: string,
    type: string,
    seats: string,
    cylinders: string,
    truckBody: string
}

export interface CarBrand {
    id: string
    make:string
    models: CarModel[]
}


export interface CarBrandsState {
    brands: CarBrand[]
}

export interface FetchCarBrandsAction {
    type: typeof FETCH_BRANDS,
    payload: CarBrand[]
}

export interface AddCarBrand {
    type: typeof ADD_CAR_BRAND,
    payload: CarBrand
}

export interface SaveCarModel {
    type: typeof SAVE_CAR_MODEL,
    payload: CarModel
}


export type CarBrandsActionTypes = FetchCarBrandsAction | AddCarBrand | SaveCarModel