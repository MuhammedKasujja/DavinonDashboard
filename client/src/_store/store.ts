import { combineReducers } from "redux";
import { driverReducer } from "./driver/reducers";
import { clientReducer } from "./Client/reducers"
import { vehicleReducer } from "./truck/reducers"
import { tripReducer } from "./trips/reducers"
import { createStore, applyMiddleware } from "redux"
import { brandsReducer } from "./CarBrands/reducers"
import { notificationReducer } from "./Events/reducers"
import { couponsReducer } from './Coupons/reducers'
import { pushNotificationsReducer } from './notifications/reducers'
import { tripReviewsReducer } from './TripReviews/reducers'
import { advertsReducer } from './adverts/reducers'
import { authReducer } from './Users/reducers'
import { settingsReducer } from './AppSettings/reducers'
import { reportsReducer } from './Reports/reducers'
import thunk from "redux-thunk"
import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    drivers: driverReducer,
    passengers: clientReducer,
    vehicles: vehicleReducer,
    trips: tripReducer,
    brands: brandsReducer,
    notifications: notificationReducer,
    adverts: advertsReducer,
    coupons: couponsReducer,
    tripReviews: tripReviewsReducer,
    pushNotifications: pushNotificationsReducer,
    auth: authReducer,
    app: settingsReducer,
    reports: reportsReducer
})

export type RootStore = ReturnType<typeof rootReducer>

export const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))