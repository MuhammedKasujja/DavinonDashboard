import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { RootStore } from '_store/store'
import { Table } from 'App/components/Table'
import { Column } from 'react-table'
import { TripPayment } from '_types/Report'
import { fetchTripsPayments } from '_store/Reports/actions'

const TripPaymentReport: React.FC<any> = () => {
    const dispatch = useDispatch();
    const reportsState = useSelector(
        (state: RootStore) => state.reports,
    )

    const columns: Array<Column<TripPayment>> =
        React.useMemo(
            () =>
                [
                    // {
                    //     id: 'selection',
                    //     Header: "#",
                    //     width: 35,
                    //     // The cell can use the individual row's getToggleRowSelectedProps method
                    //     // to the render a checkbox
                    //     Cell: ({ row }) => {
                    //         // console.log({ RowData: row.original })
                    //         return (
                    //             <Link to={{
                    //                 pathname: `/admin/reports/payments/${row.original.id}`,
                    //                 // state: {
                    //                 //     driverId: props.driver.id
                    //                 // }
                    //             }} onClick={() => {
                    //                 console.log("Yeah yes yes...........")
                    //                 //   dispatch(AddLocalDriver(row.original))
                    //             }}><EditIcon />
                    //             </Link>
                    //         )
                    //     },
                    //     accessor: 'id',
                    // },
                    {
                        Header: 'Date',
                        accessor: 'createdOn',
                    },
                    {
                        Header: 'Amount',
                        accessor: 'amount',
                    },
                    {
                        Header: 'Client',
                        accessor: 'clientName',
                    },
                    {
                        Header: 'Origin',
                        accessor: 'origin',
                    },
                    {
                        Header: 'Destination',
                        accessor: `destination`,
                    },
                    {
                        Header: 'Balance',
                        accessor: 'balance',
                    },
                    {
                        Header: 'Method',
                        accessor: 'paymentMethod',
                    },
                ],
            []
        )

    React.useEffect(() => {
        dispatch(fetchTripsPayments())
    }, [])

    return (
        <PageContainer>
            <PageToolbar
                title={`Payments`}
            />
            <Table<TripPayment>
                //onAdd={_onAdd}
                name={'tripsPaymentReport'}
                columns={columns} data={reportsState.tripPayments} />
        </PageContainer>
    )
}

export default TripPaymentReport