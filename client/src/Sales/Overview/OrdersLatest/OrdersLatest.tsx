/* eslint-disable no-script-url */

import React from 'react'
import Link from '@material-ui/core/Link'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { RootStore } from '_store/store'

const MainOrders: React.FC<any> = () => {
  const classes = useStyles()
  const tripsState = useSelector((state: RootStore) => state.trips)
  // show only the first five new orders
  const latestOrders = tripsState.trips.slice(0, 5)
  return (
    <Card style={{ marginTop: "10px" }}>
      <CardContent>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          Latest Orders
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Trip Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latestOrders.map(row => (
              <TableRow key={row.id}>
                <TableCell>{row.originAddress}</TableCell>
                <TableCell>{row.destinationAddress}</TableCell>
                <TableCell>{row.passenger.name}</TableCell>
                <TableCell>{tripStatus(row.status)}</TableCell>
                <TableCell align="right">{tripType(row.type)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className={classes.seeMore}>
          <Link color="primary" href="#">
            See more orders
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}))

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

export default MainOrders
