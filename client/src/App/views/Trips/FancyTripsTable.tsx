import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import Chip from "@material-ui/core/Chip"
import EditIcon from "@material-ui/icons/ViewAgenda"
import { Link } from 'react-router-dom'

import { TripStatus } from "_types/Enums"
import { Position, Trip, Waypoint } from '_store/trips/types'
import { RootStore } from '_store/store'
import { AddLocalTrip, fetchTrips } from '_store/trips/actions'
import { Client } from '_store/Client/types'
import { Column } from 'react-table'
import { Table } from 'App/components/Table'


const FancyTripsTable: React.FC<any> = () => {
    const dispatch = useDispatch()
    const tripsState = useSelector(
        (state: RootStore) => state.trips,
    )
    const columns: Array<Column<Trip>> =
        //  React.useMemo(
        //     () => 
        [
            {
                Header:'Date',
                accessor:'createdOn'
            },
            {
                Header: 'From',
                Cell: ({ value }: { value: Position }) => (
                    <>
                        {value.name}
                    </>
                ),
                accessor: 'origin',
            },
            {
                Header: 'To',
                Cell: ({ value }: { value: Position }) => (
                    <>
                        {value.name}
                    </>
                ),
                accessor: 'destination',
            },
            {
                Header: 'Distance',
                accessor: 'distance',
            },
            {
                Header: 'Time',
                accessor: 'duration',
            },
            {
                Header: 'Checkpoints',
                Cell: ({ value }: { value: Waypoint[] }) => {
                    // console.log({ RowData: row.original })
                    // creating a custom cell
                    var checkPoints = value.length - 1
                    return (
                        <Chip key={value[0].origin.lat} color='primary' style={{ backgroundColor: 'grey' }} label={checkPoints} />
                    )
                },
                accessor: 'waypoints',
            },
            {
                Header: 'Status',
                Cell: ({ value }: { value: string }) => {
                    // console.log({ RowData: row.original })
                    // creating a custom cell
                    var lableColor = 'grey'
                    const statusId = parseInt(value);
                    var status = TripStatus.New
                    if (statusId === 0) {
                        status = TripStatus.New
                        lableColor = 'grey'
                    }
                    if (statusId === 1) {
                        status = TripStatus.DriverPath
                        lableColor = 'yellow'
                    }
                    if (statusId === 2) {
                        status = TripStatus.inProgress
                        lableColor = 'blue'
                    }
                    if (statusId === 4) {
                        status = TripStatus.Finished
                        lableColor = 'green'
                    }
                    if (statusId === 5) {
                        status = TripStatus.Canceled
                        lableColor = 'red'
                    }

                    return (
                        <Chip key={statusId} color='primary' style={{ backgroundColor: lableColor }} label={status} />
                    )
                },
                accessor: 'status',
            },
            {
                Header: 'Client',
                Cell: ({ value }: { value: Client }) => (
                    <>
                        {value.name}
                    </>
                ),
                // accessor: 'passenger',
                accessor: (i: Trip) => i.passenger,
            },
            {
                Header: 'Actions',
                Cell: ({ row}) => (
                    <Link to={{
                        pathname: `/admin/trips/info`,
                    }} onClick={() => {
                        console.log("Yeah yes yes...........",row.original)
                        dispatch(AddLocalTrip(row.original))
                    }}>View
                        {/* <EditIcon/> */}
                    </Link>
                ),
                accessor: 'id',
            },
        ]
    // []
    // )

    React.useEffect(() => {
        dispatch(fetchTrips())
    }, [])

    return (
        <PageContainer>
            <PageToolbar
                title={`Trips`}
            />
            <Table<Trip>
                name={'tripsTable'}
                columns={columns} data={tripsState.trips}></Table>
        </PageContainer>
    )
}

export default FancyTripsTable;