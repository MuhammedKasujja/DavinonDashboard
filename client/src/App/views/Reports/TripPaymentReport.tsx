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
                    {
                        Header: 'Date',
                        accessor: 'createdOn',
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
                        Header: 'Amount',
                        accessor: 'amount',
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