import { CardContent, Card, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { ChartData, Doughnut } from 'react-chartjs-2';

interface HistoryDoughnutProps {
    canceledTrips: number,
    finishedTrips: number,
    activeTrips: number,
    openTrips: number
}

//
//  Function returning data
//
function genData(data: any): ChartData<Chart.ChartData> {
    return {
        labels: [
            'inProgress',
            'Finished',
            'Open',
            'Canceled'
        ],
        datasets: [{
            data: data,
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#415b59'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#415b59'
            ],
            radius: 50
        }]
    }

}

export default function HistoryDoughnut({ activeTrips, openTrips, canceledTrips, finishedTrips }: HistoryDoughnutProps) {
    var totalTrips:number = (activeTrips+openTrips+canceledTrips+finishedTrips);
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">Trip Requests</Typography>
                <Divider></Divider>
                <div style={{ width: "400", height: "300", float: "left", position: "relative" }}>
                    <div style={{
                        width: "100%", height: "40px", position: "absolute",
                        top: "54%", left: "0", marginTop: "-20px", lineHeight: "19px", textAlign: "center", zIndex: 999999999999999999
                    }}>
                        {totalTrips}<br />
                        Requests
                    </div>
                    <Doughnut data={genData([activeTrips, finishedTrips, openTrips, canceledTrips])} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                    }} width={400} height={300} />
                </div>
            </CardContent>
        </Card>
    );
}