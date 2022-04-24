import React from 'react'

import { useDispatch, useSelector } from "react-redux"
import Chip from "@material-ui/core/Chip"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import EditIcon from "@material-ui/icons/Edit"
import { Link } from 'react-router-dom'
import { RootStore } from '_store/store'
import { Client } from '_store/Client/types'
import { fetchClients } from '_store/Client/actions'
import { Table } from 'App/components/Table/Table'
import { Column } from 'react-table'


const FancyPassengersTable: React.FC<any> = () => {
    const dispatch = useDispatch()
    const passengersState = useSelector(
        (state: RootStore) => state.passengers,
    )
    const columns:Array<Column<Client>> = React.useMemo(
        () => [
            
            {
                Header: 'Name',
                accessor: 'name',
            },

            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Telephone',
                accessor: 'telephone',
            },
            {
                Header: 'Status',
                Cell: ({ value }: { value: Boolean }) => {
                    // console.log({ RowData: row.original })
                    // creating a custom cell
                    var lableColor = 'grey'
                    var status = 'offline'
                    if (value) {
                        status = 'online'
                        lableColor = 'green'
                    }
                    return (
                        <Chip key={status} color='primary' style={{ backgroundColor: lableColor }} label={status} />
                    )
                },
                accessor: 'status',
            },
            {
                Header: "Actions",
                // The cell can use the individual row's getToggleRowSelectedProps method
                // to the render a checkbox
                Cell: ({ value }: { value: string }) => {
                    // console.log({ RowData: row.original })
                    // creating a custom cell
                    return (
                        <Link to={{
                            pathname: `/admin/passengers/edit/${value}`,
                            // state: {
                            //     driverId: props.driver.id
                            // }
                        }} onClick={() => {
                            console.log("Yeah yes yes...........")
                            //   props.dispatch(addLocalDriver(row.original))
                        }}>View
                        </Link>
                    )
                },
                accessor: 'id',
            },
        ],
        []
    )

    React.useEffect(() => {
        dispatch(fetchClients())
    }, [])

    return (
        <PageContainer>
            <PageToolbar
                title={`Clients`}
            />
            <Table<Client>
                name={'testTable'}
                columns={columns}
                data={passengersState.clients}
                // onAdd={dummy}
                // onEdit={dummy}
                // onDelete={dummy}
            />
        </PageContainer>
    )
}

export default FancyPassengersTable