import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { RootStore } from '_store/store'
import { Table } from 'App/components/Table'
import { Column } from 'react-table'
import { fetchTripsReviews } from '_store/TripReviews/actions'
import { TripReview } from '_store/TripReviews/types'

const TripsReviewsReport: React.FC<any> = () => {
    const dispatch = useDispatch();
    const tripReviewsState = useSelector(
        (state: RootStore) => state.tripReviews,
    )

    const columns: Array<Column<TripReview>> =
        React.useMemo(
            () =>
                [
                    {
                        Header: 'Date',
                        accessor: 'createdOn',
                    },
                    {
                        Header: 'Driver',
                        accessor: 'driverName',
                    },
                    {
                        Header: 'Rating',
                        accessor: 'driverRating',
                    },
                    {
                        Header: 'Client',
                        accessor: 'clientName',
                    },
                    {
                        Header: 'Rate',
                        accessor: `rate`,
                    },
                    {
                        Header: 'Comment',
                        accessor: 'comment',
                    },
                    {
                        Header: 'Trip #',
                        accessor: 'tripCode',
                    },
                    
                ],
            []
        )

    React.useEffect(() => {
        dispatch(fetchTripsReviews())
    }, [])

    return (
        <PageContainer>
            <PageToolbar
                title={`Trip Reviews`}
            />
            <Table<TripReview>
                //onAdd={_onAdd}
                // handleOnAdd={}
                name={'tripsReviewsReport'}
                columns={columns} data={tripReviewsState.reviews} />
        </PageContainer>
    )
}

export default TripsReviewsReport