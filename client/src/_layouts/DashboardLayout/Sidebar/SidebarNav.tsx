import React from 'react'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'


import IconDashboard from '@material-ui/icons/Dashboard'
import IconOrders from '@material-ui/icons/ShoppingCart'
import IconPeople from '@material-ui/icons/People'
import IconPreson from '@material-ui/icons/Person'
import IconStock from '@material-ui/icons/LocalShipping'
import IconLocation from '@material-ui/icons/LocationOn'
import IconDrivers from "@material-ui/icons/DriveEta"
import WalletIcon from "@material-ui/icons/Payment"
import IconTrips from "@material-ui/icons/TabRounded"
import SettingIcon from "@material-ui/icons/Settings"
import ReviewIcon from "@material-ui/icons/Report"
import ReportIcon from "@material-ui/icons/StayCurrentPortraitSharp"

import { Theme } from '_theme'
import SidebarNavItems from './SidebarNavItems'

export interface SidebarNavProps {
  isCollapsed: boolean
}

const SidebarNav = (props: SidebarNavProps) => {
  const { isCollapsed } = props
  const classes = useStyles()

  const itemsSales = [
    {
      name: 'Dashboard',
      link: '/admin/dashboard',
      Icon: IconDashboard,
    },
    {
      name: 'Orders',
      link: '/admin/orders',
      Icon: IconOrders,
    },
    {
      name: 'Trips',
      link: '/admin/trips',
      Icon: IconTrips,
    },
    {
      name: 'Drivers',
      Icon: IconDrivers,
      items: [
        {
          name: 'Add Drivers',
          link: '/admin/drivers/new',
        },
        {
          name: 'View Drivers',
          link: '/admin/drivers',
        },
      ],
    },
    // {
    //   name: 'Test',
    //   Icon: IconDrivers,
    //   items: [
    //     {
    //       name: 'All Drivers',
    //       link: '/admin/dashboard',
    //     },
    //     {
    //       name: 'Add New',
    //       link: '/admin/drivers/new',
    //     },
    //   ],
    // },
    {
      name: 'Clients',
      link: '/admin/passengers',
      Icon: IconPeople,
    },
    {
      name: 'Payments',
      link: '/admin/payments',
      Icon: WalletIcon,
    },
    {
      name: 'Reviews',
      link: '/admin/trip-reviews',
      Icon: ReviewIcon,
    },
    {
      name: 'Cars',
      link: '/admin/cars',
      Icon: IconStock,
    },
    {
      name: 'Reports',
      link: '/admin/reports',
      Icon: ReportIcon,
    },
    {
      name: 'Settings',
      link: '/admin/settings',
      Icon: SettingIcon,
    },


  ]

  // eslint-disable-next-line


  const itemsBrands = [
    {
      name: 'All Brands',
      link: '/admin/brands',
    },
    {
      name: 'Add new',
      link: '/admin/brands/new',
    },
  ]



  // eslint-disable-next-line

  const itemsCoreModules = [
    {
      name: 'Car Brands',
      items: itemsBrands,
      Icon: IconPreson,
    },
    // {
    //   name: 'Profile',
    //   items: itemsProfile,
    //   Icon: IconProfile,
    // },
    // {
    //   name: 'Administration',
    //   items: itemsAdmin,
    //   Icon: IconAdmin,
    // },
    // {
    //   name: 'Misc Pages',
    //   items: itemsMisc,
    //   Icon: IconMisc,
    // },
  ]


  return (
    <div>
      <List className={classes.navList} disablePadding>
        {!isCollapsed && (
          <ListSubheader disableSticky={true} className={classes.navListHeader}>
            Applications
          </ListSubheader>
        )}
        <SidebarNavItems isCollapsed={isCollapsed} items={itemsSales} />
      </List>

      <List className={classes.navList} disablePadding>
        {/* {!isCollapsed && (
          <ListSubheader disableSticky={true} className={classes.navListHeader}>
            Settings
          </ListSubheader>
        )} */}
        {/* <SidebarNavItems isCollapsed={isCollapsed} items={itemsCoreModules} /> */}
      </List>

      {/* <List className={classes.navList} disablePadding>
        {!isCollapsed && (
          <ListSubheader disableSticky={true} className={classes.navListHeader}>
            Misc
          </ListSubheader>
        )}
        <SidebarNavItems isCollapsed={isCollapsed} items={itemsTheme} />
      </List> */}
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    navList: {
      width: theme.sidebar.width,
      fontSize: '1.1em',
      fontWeight: 400,
      lineHeight: 1.5,
      // color:'#d4a248',
      letterSpacing: '0.00938em',
    },
    navListHeader: {
      textAlign: 'center',
    },
    iconFeatures: {
      color: '#95de3c',
    },
    iconDocs: {
      color: '#f8cda9',
    },
    iconSupporters: {
      color: '#e3b546',
    },
    iconDiscuss: {
      color: '#ccc',
    },
  }),
)

export default SidebarNav
