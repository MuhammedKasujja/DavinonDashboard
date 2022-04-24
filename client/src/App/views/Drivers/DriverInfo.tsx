import React from "react";
import { createStyles, makeStyles, StyleRules } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import { useDispatch, useSelector } from "react-redux"
import Box from '@material-ui/core/Box';
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { RootStore } from "_store/store";
import TripVehicle from "../Trips/TripVehicle";
import SectionHeader from "App/components/SectionHeader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import CardContent from "@material-ui/core/CardContent";
import { Table } from "App/components/Table";
import { Trip } from "_store/trips/types";
import DriverTripsTable from "./DriverTripsTable";
import DriverRating from "App/components/DriverRating";
import { Typography } from "@material-ui/core";

const styles: StyleRules = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    personIcon: {
        '& svg': {
            fontSize: 100
        }
    }
};

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles(() => createStyles(styles))

const DriverInfo: React.FC<any> = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const driver = useSelector(
        (state: RootStore) => state.drivers.localDriver,
    )

    const [truck] = React.useState(driver && (driver.trucks && driver.trucks[0]))
    const [rating, setRating] = React.useState<number | null>(driver === undefined ? null : driver.charisma);
    const [hover, setHover] = React.useState(-1);
    const [] = React.useState(false);

    React.useEffect(() => {
        // console.log('component mounted')

        // return a function to execute at unmount {When removing the page}
        return () => {
            // console.log('component will unmount')
            // dispatch(addLocalDriver(null))
            // dispatch(isTableFiltered(false))
        }
    }, []) // notice the empty array
    const vehicle = (driver
        && driver.trucks)
        ? driver.trucks[0]
        : undefined;


    return (
        <PageContainer>
            <PageToolbar
                title={`Drivers/${driver && driver.name}`}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <SectionHeader title="Driver info" />
                        <CardBody>
                            <div style={{ height: 380 }}>
                                <CardAvatar>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={driver && driver.photo.url} alt={driver && driver.name} />
                                    </a>
                                </CardAvatar>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                </Box>
                                <h4 className={classes.cardTitle}>{driver && driver.name}</h4>
                                <h4 className={classes.cardTitle}>{truck && `${truck.licencePlate}`}</h4>
                                <DriverRating rate={driver === undefined ? null : driver.charisma}/>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card >
                        <CardContent >
                            <div style={{ height: 380 }}>
                                {vehicle && <List><ListItem><TripVehicle vehicle={vehicle} /></ListItem></List>}
                            </div>
                        </CardContent>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Typography>Trips</Typography>
                    {driver && <DriverTripsTable trips={[]} />}
                </GridItem>
            </GridContainer>
        </PageContainer>
    );
}

export default DriverInfo