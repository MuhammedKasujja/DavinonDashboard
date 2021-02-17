import React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'

import dashboardRoutes from "../views/Pages"
import Overview from "../../Sales/Overview"

export interface AdminProps extends RouteComponentProps { }

const Admin = ({ match }: AdminProps) => {
  // const {TripsMap} = dashboardRoutes
  return (
    <Switch>
      <Route path={`${match.url}/dashboard`} component={Overview} />
      {/* <Route path={`${match.url}/dashboard`} component={dashboardRoutes.DashboardPage} /> */}
      <Route path={`${match.url}/orders`} component={dashboardRoutes.TripsMap} />
      <Route exact path={`${match.url}/trips/info`} component={dashboardRoutes.TripDetails} />
      <Route path={`${match.url}/trips`} component={dashboardRoutes.FancyTripsTable} />
      <Route path={`${match.url}/drivers/new`} component={dashboardRoutes.RegisterDriver} />
      <Route exact path={`${match.url}/drivers/edit/:name`} component={dashboardRoutes.DriverProfile} />
      <Route path={`${match.url}/drivers`} component={dashboardRoutes.DriversTable} />
      <Route path={`${match.url}/passengers`} component={dashboardRoutes.PassengersTable} />
      <Route path={`${match.url}/reports`} component={dashboardRoutes.RegisterTruck} />
      <Route path={`${match.url}/cars`} component={dashboardRoutes.FancyTrucksTable} />
      <Route path={`${match.url}/brands/new`} component={dashboardRoutes.Register} />
      <Route path={`${match.url}/brands`} component={dashboardRoutes.BrandsTable} />
      <Route path={`${match.url}/settings/general`} component={dashboardRoutes.GeneralSettings} />
      <Route path={`${match.url}/settings`} component={dashboardRoutes.GeneralSettings} />
      <Route path={`${match.url}/payments`} component={dashboardRoutes.TripPaymentReport} />
      <Route path={`${match.url}/trip-reviews`} component={dashboardRoutes.TripsReviews} />
      {/* <Route path={`${match.url}/fancy`} component={dashboardRoutes.FancyDriversTable} /> */}
    </Switch>
  )
}

export default Admin
