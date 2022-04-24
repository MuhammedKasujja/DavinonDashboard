import { Chip } from "@material-ui/core"
import { Table } from "App/components/Table"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Column } from "react-table"
import { RootStore } from "_store/store"
import { AddLocalTrip } from "_store/trips/actions"
import { Position, Trip, Waypoint } from "_store/trips/types"
import { TripStatus } from "_types/Enums"

export interface DriverTripsTableProps{
 trips?:Trip[]
}

const DriverTripsTable:React.FC<DriverTripsTableProps> = (props) => {
    const { trips } = props
    const dispatch = useDispatch()
    const tripsState = useSelector(
        (state: RootStore) => state.trips,
    )
    const columns: Array<Column<Trip>> =
        //  React.useMemo(
        //     () => 
        [
            
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
                // width:'60px'
            },
            {
                Header: 'Time',
                accessor: 'duration',
                // width:'30px'
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

    return (<Table<Trip>
        name={'driverTripsTable'}
        columns={columns} data={tripsState.trips}></Table>)
}

export default DriverTripsTable