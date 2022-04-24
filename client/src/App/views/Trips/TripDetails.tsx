import { Avatar, Button, Card, CardContent, ListItemAvatar, Table, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import GridContainer from 'App/components/Grid/GridContainer'
import GridItem from 'App/components/Grid/GridItem'
import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { useDispatch, useSelector } from "react-redux"
import { RootStore } from '_store/store'
import { AddLocalTrip } from '_store/trips/actions'
import PageContainer from "../../components/PageContainer/index"
import SectionHeader from 'App/components/SectionHeader'
import DetailListItem from 'App/components/DetailListItem'

const TripDetails: React.FC<any> = () => {

    const tripsState = useSelector(
        (state: RootStore) => state.trips,
    )
    const dispatch = useDispatch()

    const RenderDriver = () => {
        if (trip && trip.driver && trip.driver.name) {
            return (
                <GridContainer>
                    <GridItem xs={12} md={12} lg={12}>
                        <Card style={{ marginTop: "10px", width: "100%" }} >
                            <SectionHeader title='Driver' />

                            {trip && <CardContent >
                                <List>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar alt={trip.driver.name} src={trip.driver.photo.url} style={{ width: "120px", height: "120px" }} />
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {trip.driver.name}<br />
                                            {trip.driver.telephone}<br />
                                            {trip.driver.email}
                                        </ListItemText>
                                    </ListItem>
                                    <ListItem>
                                        <TripVehicle />
                                    </ListItem>
                                </List>
                            </CardContent>
                            }
                        </Card>
                    </GridItem>
                </GridContainer>)
        }
        else {
            return <GridContainer>
                <GridItem xs={12} md={12} lg={12}>
                    <Card style={{ marginTop: "15px" }}>
                        <div style={{ height: "200px" }}>
                            <Button variant="outlined" color="primary" onClick={() => { }}>
                                Assign Driver
                            </Button>
                        </div>
                    </Card>
                </GridItem>
            </GridContainer>
        }
    }

    const TripVehicle = () => {
        const vehicle = (trip !== undefined
            && trip.driver !== undefined
            && trip.driver.trucks != undefined)
            ? trip.driver.trucks[0]
            : undefined;
        return (<React.Fragment>
            {vehicle && (<div>
                <DetailListItem label="Brand" value={vehicle.brand} />
                <DetailListItem label="Year" value={vehicle.year} />
                <DetailListItem label="Color" value={vehicle.color} />
                <DetailListItem label="Drive Train" value={vehicle.driveTrain} />
            </div>)
            }
        </React.Fragment>)
    }


    React.useEffect(() => {
        // return a function to execute at unmount
        return () => {
            // console.log('component will unmount')
            dispatch(AddLocalTrip(undefined))
        }
    }, []) // notice the empty array
    const trip = tripsState.localTrip;
    // console.log({"trip":trip})
    return (
        <PageContainer>
            <GridContainer>
                <GridItem xs={12} md={6} lg={6}>
                    <Card style={{ height: "100%" }}>
                        <SectionHeader title="Trip Details" />
                        {trip &&
                            <CardContent style={{ height: "100%" }}>
                                <List>
                                    <DetailListItem label="Code" value={trip.code} />
                                    <DetailListItem label="Origin" value={trip.originAddress} />
                                    <DetailListItem label="Destination" value={trip.destinationAddress} />
                                    <div><DetailListItem label="Distance" value={trip.distance} />
                                        <DetailListItem label="Duration" value={trip.duration} />
                                    </div>
                                    <DetailListItem label="Payment Method" value={trip.paymentMethod} />
                                    <DetailListItem label="Status" value={tripStatus(trip.status)} />
                                    <DetailListItem label="Type" value={tripType(trip.type)} />
                                    <DetailListItem label="Date" value={trip.createdOn.toString()} />
                                </List>
                            </CardContent> 
                        }
                    </Card>  
                </GridItem>
                <GridItem xs={12} md={6} lg={6}> 
                    <Card>
                        <SectionHeader title='Passenger' />
                        {trip &&
                            <CardContent>
                                <List>
                                    <DetailListItem label="Name" value={trip.passenger.name} />
                                    <DetailListItem label="Email" value={trip.passenger.email} />
                                    <DetailListItem label="Telephone" value={trip.passenger.telephone} />
                                </List>
                            </CardContent>
                        }
                    </Card>
                    <RenderDriver />
                </GridItem>
            </GridContainer>

            <Card style={{ marginTop: "10px" }}>
                <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                        Checkpoints {trip && [trip.waypoints.length]}
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Distance</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {trip && trip.waypoints.map(row => (
                                <TableRow key={row.destination.lng}>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.duration}</TableCell>
                                    <TableCell>{row.distance}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </PageContainer>
    );
}

const tripType = (type: number) => {
    if (type === 0) {
        return 'Passenger'
    }
    else if (type === 1) {
        return 'Cargo'
    }
    else if (type === 2) {
        return 'Trip Cargo'
    }
    else if (type === 3) {
        return 'Trip'
    } else {
        return ''
    }
}

const tripStatus = (status: number) => {
    if (status === 0) {
        return 'New'
    }
    else if (status === 1) {
        return 'Accepted'
    }
    else if (status === 2) {
        return 'Waiting'
    }
    else if (status === 3) {
        return 'Driver Path'
    } else if (status === 4) {
        return 'OnTrip'
    }
    else if (status === 5) {
        return 'Completed'
    }
    else if (status === 6) {
        return 'Canceled'
    }
    else {
        return ''
    }
}

export default TripDetails