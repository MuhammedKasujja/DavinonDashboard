import React from 'react'
import Grid from "@material-ui/core/Grid"
import TripsIcon from "@material-ui/icons/Toc"
import RevenueIcon from "@material-ui/icons/AttachMoney"
import TravelsIcons from "@material-ui/icons/DepartureBoard"
import DriversIcon from "@material-ui/icons/GpsFixed"

import DashboardMenuItem from './Main.params';
import { useSelector } from 'react-redux'
import { RootStore } from '_store/store'

interface DashboardItemProps {
    children?: any,
    color?: string
}
const iconSize = 45;
const DashboardItem = ({ color }: DashboardItemProps) => {
    const tripsState = useSelector((state: RootStore) => state.trips)
    const reportsState = useSelector((state: RootStore) => state.reports)
    const notificationState = useSelector((state: RootStore) => state.notifications)

    const scheduledTrips = tripsState.trips.filter(trip =>
        trip.type === 2 || trip.type === 3
    )
    tripsState.trips.forEach(trip=>{
    //    trip.
    })

    return (
        <Grid container spacing={1}>
            <DashboardMenuItem value={tripsState.trips.length.toString()} title={'Trips'} color='#FFCE56'
                icon={<TripsIcon style={{ fontSize: iconSize, color: "#FFCE56" }} />} />
            <DashboardMenuItem value={scheduledTrips.length.toString()} title={'New Travels'} color="#415b59"
                icon={<TravelsIcons style={{ fontSize: iconSize, color: "#415b59" }} />} />
            <DashboardMenuItem value={reportsState.totalPayments.toString()} title={'Revenue'} color="#36A2EB"
                icon={<RevenueIcon style={{ fontSize: iconSize, color: "#36A2EB" }} />} />
            <DashboardMenuItem value={notificationState.activeDrivers.length.toString()} title={'Drivers'} color="#FF6384"
                icon={<DriversIcon style={{ fontSize: iconSize, color: "#FF6384" }} />} />
        </Grid>
    )
}

export default DashboardItem
