import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography"
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux"
import { RootStore } from '_store/store';

const ActiveDrivers: React.FC<any> = () => {

    const notificationState = useSelector(
        (state: RootStore) => state.notifications,
    )
    // const activeDrivers = driversState.drivers.filter(driver => driver.status !== 0)
    const classes = useStyles()
    return (
        <Card >
            <CardContent>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    Active Drivers [{notificationState.activeDrivers.length}]
                </Typography>
                <List>
                    {notificationState.activeDrivers.slice(0, 5).map(d => (
                        <ListItem key={d.id}>
                            <ListItemAvatar>
                                <Avatar alt={d.name} src={d.photo.url} />
                            </ListItemAvatar>
                            <ListItemText primary={d.name} secondary={driverStatus(d.status)} />
                        </ListItem>
                    ))}
                </List>
                <div className={classes.seeMore}>
                    <Link color="primary" href="#/admin/drivers">
                        See more
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end',
    },
}))

const driverStatus =(status:number)=>{
    if(status === 0){
      return 'Offline'
    }
    else if(status === 1){
      return 'Looking For Trip'
    }
    else if(status === 2){
      return 'Going to Passenger'
    }
    else if(status === 3){
      return 'OnTrip'
    }else{
      return ''
    }
  }

export default ActiveDrivers