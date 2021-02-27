import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import Chip from "@material-ui/core/Chip"
import EditIcon from "@material-ui/icons/Edit"
import { Link } from 'react-router-dom'

import { TripStatus } from "_types/Enums"
import { Position, Trip, Waypoint } from '_store/trips/types'
import { RootStore } from '_store/store'
import { AddLocalTrip, fetchTrips } from '_store/trips/actions'
import { Client } from '_store/Client/types'
import { Column } from 'react-table'
import { Table } from 'App/components/Table'
import PageContainer from 'App/components/PageContainer'
import PageToolbar from 'App/components/PageToolbar'


const UsersTable: React.FC<any> = () => {
    const dispatch = useDispatch()
    const tripsState = useSelector(
        (state: RootStore) => state.trips,
    )
    const columns: Array<Column<Trip>> =
        //  React.useMemo(
        //     () => 
        [
            {
                Header: 'Username',
                Cell: ({ value }: { value: Position }) => (
                    <>
                        {value.name}
                    </>
                ),
                accessor: 'origin',
            },
            {
                Header: 'Email',
                Cell: ({ value }: { value: Position }) => (
                    <>
                        {value.name}
                    </>
                ),
                accessor: 'destination',
            },
            {
                Header: 'Role',
                accessor: 'distance',
            },
            {
                Header: 'Eabled',
                accessor: 'duration',
            },
            {
                Header: 'Last Active',
                accessor: 'createdOn',
            },
            {
                Header: 'Actions',
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
        ]
    // []
    // )

    React.useEffect(() => {
        dispatch(fetchTrips())
    }, [])

    return (
        <PageContainer>
            <Table<Trip>
                name={'usersTable'}
                columns={columns} data={tripsState.trips}></Table>
        </PageContainer>
    )
}

export default UsersTable