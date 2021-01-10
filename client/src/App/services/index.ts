import CarModelsService from "./CarModelsService"
import CarBrandsService from "./CarBrandsService"
import DriverService from "./DriverService"
import UserService from "./UserService"
import TruckService from "./TruckService"
import VehicleService from "./VehicleService"
import TripService from "./TripService"
import PassengerService from "./PassengerService"
import MainApi from "./DriverService.api"
import AppSettingsService from "./AppSettingsService"
import ReportsService from './ReportsService'

const service = {
    CarModelsService, CarBrandsService,
    DriverService, TruckService,
    VehicleService, TripService,
    UserService, PassengerService,
    MainApi, AppSettingsService,
    ReportsService
}

export default service;