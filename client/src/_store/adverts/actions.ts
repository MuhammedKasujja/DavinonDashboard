import { Dispatch } from "redux"
import service from "../../App/services/index";
import { Advert, AdvertsActionTypes, FETCH_ALL_ADVERTS, SAVE_ADVERT } from "./types"

export const fetchAdverts = () => async (dispatch: Dispatch<AdvertsActionTypes>) => {
    const res = await service.PassengerService.fetchAllPassengers()
    console.log({'Adverts':res.data.adverts})
    dispatch({
        type: FETCH_ALL_ADVERTS,
        payload: res.data.passengers
    })
}

export const saveAdvert = (advert: Advert) => async (dispatch: Dispatch<AdvertsActionTypes>) => {
    const res = await service.PassengerService.addPassenger(advert)
    dispatch( {
        type: SAVE_ADVERT,
        payload: advert
    })
}
