import { Dispatch } from "redux"
import service from "../../App/services/index";
import { CarBrand, CarBrandsActionTypes, FETCH_BRANDS, ADD_CAR_BRAND, SAVE_CAR_MODEL } from "./types"

export const fetchBrands = () => async (dispatch: Dispatch<CarBrandsActionTypes>) => {
    service.CarBrandsService.fetchAllBrands()
        .then((res) => {
            dispatch({
                type: FETCH_BRANDS,
                payload: res.data.brands
            })
        }).catch((err) => {
            console.log(err);
        })
}

export const addBrands = (brand: CarBrand) => async (dispatch: Dispatch<CarBrandsActionTypes>) => {
    console.log({ 'ReduxDispatch': `printing from redux ${JSON.stringify(brand)}` })
    service.CarBrandsService.addBrand(brand)
        .then(res => {
            console.log({ 'ReduxDispatch': res.data })
            dispatch({
                type: ADD_CAR_BRAND,
                payload: res.data.brands
            });

        }).catch(err => {
            console.log(err);
        })

}

export const saveBrandModel = (brandModel: CarBrand) => async (dispatch: Dispatch<CarBrandsActionTypes>) => {
    service.CarModelsService.editBrandModel(brandModel)
        .then(res => {
            console.log({ 'ReduxDispatch': res.data })
            // dispatch(changeBrandsList(res.data.brands));
            // After saving data fetch new car brands
            fetchBrands()

        }).catch((err) => {
            console.log(err);
        })

}

