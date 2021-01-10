import service from "../../services/index"
import {FETCH_PASSENGERS} from "./Types"

export const fetchPassengers = () => {
    return dispatch => {
        // console.log({'ReduxDispatch':'printing from redux'})
        service.DriverService.fetchAllDrivers()
            .then((res) => {
                // console.log({'ReduxDispatch':res.data.trips})
                dispatch(changePassengersList(res.data.drivers));

            }).catch((err) => {
                console.log(err);
            })
    };
}

export function changePassengersList(data) {
    return {
        type: FETCH_PASSENGERS,
        payload: { passengers: data }
    }
}

