import ListItem from '@material-ui/core/ListItem';
import DetailListItem from 'App/components/DetailListItem';
import React from 'react'
import { Vehicle } from "_store/truck/types";

export interface TripVehicleProps {
    vehicle: Vehicle
}

const TripVehicle = (props: TripVehicleProps) => {
    const { vehicle } = props
    return (
        <React.Fragment>
            <DetailListItem label="Brand" value={vehicle.brand} />
            <DetailListItem label="Year" value={vehicle.year} />
            <DetailListItem label="Color" value={vehicle.color} />
            <DetailListItem label="Drive Train" value={vehicle.driveTrain} />
        </React.Fragment>
    )
}

export default TripVehicle