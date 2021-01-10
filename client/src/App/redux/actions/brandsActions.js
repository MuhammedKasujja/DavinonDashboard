import service from "../../services/index"
import { FETCH_BRANDS } from "./Types"

export const fetchBrands = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.CarBrandsService.fetchAllBrands()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changeBrandsList(res.data.brands));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changeBrandsList(data) {
    return {
        type: FETCH_BRANDS,
        payload: { brands: data }
    }
}

export const addBrands = (brand) => {
    return dispatch => {
        console.log({ 'ReduxDispatch': `printing from redux ${JSON.stringify(brand)}` })
        service.CarBrandsService.addBrand(brand)
            .then(res => {
                console.log({ 'ReduxDispatch': res.data })
                dispatch(success);

            }).catch(err => {
                console.log(err);
            })
    };
}

export const saveBrandModel = (brandModel) => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.CarModelsService.editBrandModel(brandModel)
            .then(res => {
                console.log({ 'ReduxDispatch': res.data })
                // dispatch(changeBrandsList(res.data.brands));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function success() {
    return {}
}

