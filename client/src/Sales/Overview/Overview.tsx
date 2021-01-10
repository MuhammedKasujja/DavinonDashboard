import React, { useState } from 'react'
import moment from 'moment'
// import clsx from 'clsx'
// import { makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import PageContainer from '../../_common/PageContainer'
import PageToolbar from '../../_common/PageToolbar'
import { SalesDashboardProvider } from './overviewContext'
import SalesDashboardActions from './OverviewActions'
import OrdersLatest from './OrdersLatest'
import DashboardItem from '_common/DashboardItems/DashboardItem'
import ActiveDrivers from './ActiveDrivers'
import TripOrdersHistory from './OrdersHistory/TripOrdersHistory'
import { useDispatch } from 'react-redux'
import { fetchTrips } from '_store/trips/actions';
// import { GetDrivers } from '_store/driver/actions';
import { fetchActiveDriversNotification } from '_store/Events/actions'

export default function SalesDashboard() {
  const dispatch = useDispatch()
  const [filter, setFilter] = useState({
    dateFrom: moment()
      .subtract(14, 'day')
      .startOf('day'),
    dateTo: moment().startOf('day'),
  })

  const PageTitle = 'Today\'s Dashboard'
  
  React.useEffect(() => {
    dispatch(fetchTrips())
    // dispatch(GetDrivers())
    dispatch(fetchActiveDriversNotification())
}, []) 

  return (
    <SalesDashboardProvider value={{ filter, setFilter }}>
      <PageContainer>
        <PageToolbar
          title={PageTitle}
          actionsComponent={SalesDashboardActions}
        ></PageToolbar>
        {/* Totals */}
        {/* <Grid item xs={12} md={12} lg={12}> */}
        <DashboardItem />
        {/* </Grid> */}
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={12} lg={9}>
            {/* <OrdersHistory /> */}
            {/* <ChartHistory/> */}
            <TripOrdersHistory/>
            <OrdersLatest /> 
          </Grid>
          {/* Recent Orders */}
          <Grid item xs={12} md={12} lg={3}>
            <ActiveDrivers />
          </Grid>
        </Grid>
      </PageContainer>
    </SalesDashboardProvider>
  )
}

// const useStyles = makeStyles((theme: Theme) => ({
//   container: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
// }))
