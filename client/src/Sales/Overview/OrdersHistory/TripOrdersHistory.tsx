import { Card, CardContent } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "_store/store";
import HistoryDoughnut from "./HistoryDoughnut";
import ProgressBarHistory from "./ProgressBarHistory";

const TripOrdersHistory: React.FC = () => {
    const tripsState = useSelector(
        (state: RootStore) => state.trips,
    )
    var openTrips = tripsState.trips.filter(trip => trip.status === 0).length
    var canceledTrips = tripsState.trips.filter(trip => trip.status === 5).length;
    var finishedTrips = tripsState.trips.filter(trip => trip.status === 4).length;
    var activeTrips = tripsState.trips.filter(trip => trip.status === 2).length;

    return (
        <Grid container>
            <Grid item xs={12} md={6} lg={6}>
                <HistoryDoughnut openTrips={openTrips}
                    canceledTrips={canceledTrips} finishedTrips={finishedTrips}
                    activeTrips={activeTrips} />
            </Grid>
            <Grid item xs={12} md={6} lg={6} alignItems="center">
                <Card style={{ height: "100%" }}>
                    <CardContent style={{ height: "100%" }}>
                        <ProgressBarHistory color={'#FFCE56'} value={openTrips} type="Open" />
                        <ProgressBarHistory color={'#415b59'} value={canceledTrips} type="Canceled" />
                        <ProgressBarHistory color={'#36A2EB'} value={finishedTrips} type="Finished" />
                        <ProgressBarHistory color={'#FF6384'} value={activeTrips} type="InProgress" />
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}

export default TripOrdersHistory