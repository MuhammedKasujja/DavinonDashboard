import { combineReducers } from "redux"
import { authReducer } from "./authReducers"
import { brandsReducer } from "./brandsReducers"
import { carsReducer } from "./carsReducers"
import { driversReducer } from "./driversReducers"
import { notificatiosReducer } from "./notificationsReducers"
import { passengerReducer } from "./passengersReducers"
import { tripsReducer } from "./tripsReducers"
import {tableReducer} from "./tableReducers"

export const rootReducer = combineReducers({
    trips: tripsReducer,
    passengers: passengerReducer,
    vehicles: carsReducer,
    brands: brandsReducer,
    drivers: driversReducer,
    auth: authReducer,
    notifications: notificatiosReducer,
    tables: tableReducer
})