import React from 'react'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'

import Overview from './Overview'
import Orders from './Orders'
import Customers from './Customers'
import AddProduct from "./Products"
import ProductsList from  "./Products/ProductsList/ProductsList"

export interface SalesProps extends RouteComponentProps {}

const Sales = ({ match }: SalesProps) => {
  return (
    <Switch>
      <Route path={`${match.url}/dashboard`} component={Overview} />
      <Route path={`${match.url}/orders`} component={Orders} />
      <Route path={`${match.url}/customers`} component={Customers} />
      <Route path={`${match.url}/products/new`} component={AddProduct} />
      <Route path={`${match.url}/products`} component={ProductsList} />
    </Switch>
  )
}

export default Sales
