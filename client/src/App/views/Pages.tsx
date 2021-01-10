
import UserProfile from "./UserProfile/UserProfile.js";
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

const dashboardRoutes = ({
    DashboardPage, TripsMap, TripsTable, UserProfile, //Drivers,
    DriversTable,
    RegisterDriver,
    PassengersTable,
    TrucksTable,
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
    TripsReviews
});

export default dashboardRoutes;
