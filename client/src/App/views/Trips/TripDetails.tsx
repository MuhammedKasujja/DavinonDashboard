import { Avatar, Card, CardContent, ListItemAvatar, Table, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import TableBody from '@material-ui/core/TableBody'
import GridContainer from 'App/components/Grid/GridContainer'
import GridItem from 'App/components/Grid/GridItem'
import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import { RootStore } from '_store/store'
import { AddLocalTrip } from '_store/trips/actions'
import PageContainer from "../../components/PageContainer/index"

const TripDetails: React.FC<any> = () => {

    const tripsState = useSelector(
        (state: RootStore) => state.trips,
    )
    const dispatch = useDispatch()

    const RenderDriver = () => {
        if (trip && trip.driver && trip.driver.name) {
            return (
                <GridContainer>
                    <GridItem xs={12} md={6} lg={6}>
                        <Card style={{ marginTop: "10px", width:"100%"}} >
                            <Typography variant="h5" color="textSecondary" gutterBottom>
                                Driver
                            </Typography>
                            {trip && <CardContent >
                                <ListItemAvatar>
                                    <Avatar alt={trip.driver.name} src={trip.driver.photo.url} style={{width:"120px", height:"120px"}}/>
                                </ListItemAvatar>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Name {trip.driver.name}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    telephone: {trip.driver.telephone}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Email: {trip.driver.email}
                                </Typography>
                                <Typography variant="h6" color="textSecondary" gutterBottom>
                                    Status: {trip.driver.status}
                                </Typography>
                            </CardContent>
                            }
                        </Card>
                    </GridItem>
                </GridContainer>)
        }
        else {
            return <Typography variant="h6" color="textSecondary" gutterBottom>
                Assign driver
          </Typography>
        }

    }

    React.useEffect(() => {
        // console.log('component mounted')

        // setTruck(props.driver && props.driver.trucks[0])
        // console.log({ Truck: truck })
        // setDriver(props.driver)

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
                        <Typography variant="h5" color="textSecondary" gutterBottom>
                            Trip Details
                        </Typography>
                        {trip && <CardContent style={{ height: "100%" }}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Code {trip.code}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Origin: {trip.originAddress}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Destination: {trip.destinationAddress}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Payment Method: {trip.paymentMethod}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Total Distance: {trip.distance}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Total Duration: {trip.duration}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Status: {tripStatus(trip.status)}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Type: {tripType(trip.type)}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                CreatedAt: {trip.createdOn.toISOString}
                            </Typography>
                        </CardContent>
                        }
                    </Card>
                </GridItem>
                <GridItem xs={12} md={6} lg={6}>
                    <Card>
                        <Typography variant="h6" color="textSecondary" gutterBottom>
                            Passenger Info
                        </Typography>
                        {trip && <CardContent>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                {trip.passenger.name}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                {trip.passenger.email}
                            </Typography>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                {trip.passenger.telephone}
                            </Typography>
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

const tripType =(type:number)=>{
    if(type === 0){
      return 'Passenger'
    }
    else if(type === 1){
      return 'Cargo'
    }
    else if(type === 2){
      return 'Trip Cargo'
    }
    else if(type === 3){
      return 'Trip'
    }else{
      return ''
    }
  }

  const tripStatus =(status:number)=>{
    if(status === 0){
      return 'New'
    }
    else if(status === 1){
      return 'Accepted'
    }
    else if(status === 2){
      return 'Waiting'
    }
    else if(status === 3){
      return 'Driver Path'
    }else if(status === 4){
      return 'OnTrip'
    }
    else if(status === 5){
      return 'Completed'
    }
    else if(status === 6){
      return 'Canceled'
    }
    else{
      return ''
    }
  }

export default TripDetails