
import DriverProfile from "./Drivers/DriverProfile";
import RegisterDriver from "./Drivers/RegisterPage"
import BrandsTable from "./CarBrands/BrandsTable"
import Register from "./CarBrands/Register"
import DriversTable from "./Drivers/DriversTable"
import TripsTable from "./Trips/TripsTable"
import TripsMap from "./Maps/TripsMap"
import PassengersTable from "./Passengers/PassengersTable"
import TrucksTable from "./Trucks/TrucksTable"
import RegisterTruck from "./Trucks/RegisterTruck"
import GoogleMap from "./Maps/DriversMap"
import Reports from "./Reports"
// import Drivers from "../components/Table/PagingTable.js";
import RouterBreadcrumbs from "./Dashboard/BreadCrumbs.js";
import DashboardPage from "./Dashboard/Dashboard"
import FancyTrucksTable from "./Trucks/FancyTrucksTable"
import FancyTripsTable from "./Trips/FancyTripsTable"
import SettingsPage from "./Settings/Settings"
import GeneralSettings from "./Settings/General/GeneralSettings"
import TripDetails from "./Trips/TripDetails"
import TripPaymentReport from './Reports/TripPaymentReport'
import TripsReviews from './Reports/TripsReviewsReport'
import MapWrapper from "./Maps/index"
import DriverInfo from "./Drivers/DriverInfo"
import TruckDetails from "./Trucks/TruckDetails"

const dashboardRoutes = ({
    DashboardPage, TripsMap, TripsTable, DriverProfile, //Drivers,
    DriversTable,
    RegisterDriver,
    PassengersTable,
    TrucksTable,
    MapWrapper,
    RegisterTruck,
    BrandsTable,
    Register,
    FancyTripsTable,
    FancyTrucksTable,
    TripDetails,
    RouterBreadcrumbs,
    GoogleMap,
    SettingsPage,
    GeneralSettings,
    TripPaymentReport,
    TripsReviews,
    DriverInfo,
    Reports,
    TruckDetails
});

export default dashboardRoutes;
