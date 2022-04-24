import React, { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import IconNotifications from '@material-ui/icons/Notifications'
import Menu from '@material-ui/core/Menu'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import { connect, useDispatch, useSelector } from "react-redux"
import { fetchNewPaymentsNotification, fetchTripNotification, makePaymentsNotificationsAsRead } from '_store/Events/actions'
import { RootStore } from '_store/store'
import { DefaultToast, ToastProps, ToastProvider, useToasts, ToastConsumer } from 'react-toast-notifications';
import { Button, Divider, Drawer } from '@material-ui/core'
import ListItemIcon from '@material-ui/core/ListItemIcon';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { PaymentNotification } from '_store/Events/types'

const notifications = [
  {
    user: {
      name: 'Type Instant',
      image: 'https://material-ui.com/static/images/avatar/1.jpg',
    },
    title: 'New Trip',
    content: " From Kawanda to Mubende",
  },
  {
    user: {
      name: 'Reached Destination',
      image: 'https://material-ui.com//static/images/avatar/2.jpg',
    },
    title: 'Driver Status',
    content: " at 18:45",
  },
  {
    user: {
      name: 'Trip Canceled',
      image: 'https://material-ui.com//static/images/avatar/3.jpg',
    },
    title: 'Trip Staus',
    content: ' Driver not responding',
  },
]
// const HeaderNotificationsProps = ConnectedProps<typeof connector> 

const HeaderNotifications = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [isPaymentsDrawerOpen, setIsPaymentsDrawerOpen] = React.useState<boolean>(false)
  const notificationState = useSelector((state: RootStore) => state.notifications)
  const dispatch = useDispatch()
  // const { addToast } = useToasts();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
    // let notificationsIds: Array<string> = [];
    // notificationState.payments.forEach(not => {
    //   notificationsIds.push(not.id);
    // })
    // if (notificationsIds.length > 0)
    //   dispatch(makePaymentsNotificationsAsRead(notificationsIds))

  }

  function handleOpenPaymentsNotificationClick() {
    let notificationsIds: Array<string> = [];
    notificationState.payments.forEach(not => {
      notificationsIds.push(not.id);
    })
    if (notificationsIds.length > 0)
      dispatch(makePaymentsNotificationsAsRead(notificationsIds))

  }

  const paymnetNotificationItem = (not: PaymentNotification) => {
    const title = not.amount + " " + not.paymentMethod;
    return <ListItem button key={not.id}>
      <ListItemText primary={title} secondary={not.tripCode} />
    </ListItem>
  }

  function handleClose() {
    setAnchorEl(null)
  }
  useEffect(() => {
    dispatch(fetchTripNotification())
    dispatch(fetchNewPaymentsNotification())
    console.log('component mounted!')
  }, [])
  useEffect(() => {
    // addToast(
    //   'Toast',
    //   {
    //     appearance: 'error',
    //     autoDismiss: true,
    //   },
    //   () => { },
    // )
  })

  const toggleDrawer = (openPaymentNotification: boolean, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    // console.log({ "DrawerState": open })
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setIsPaymentsDrawerOpen(open)
    if (openPaymentNotification === true)
      handleOpenPaymentsNotificationClick()

  };

  const list = () => (
    <div style={{ width: "250px" }}
      role="presentation"
      onClick={toggleDrawer(false, false)}
      onKeyDown={toggleDrawer(false, false)}
    >
      <ListItem button key={'header'}>
        <ListItemIcon><MailIcon /></ListItemIcon>
        <ListItemText primary="New Payments" />
      </ListItem>
      <Divider />
      <List>
        {notificationState.payments.map((payment) => (
           paymnetNotificationItem(payment)
        ))}
      </List>
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div className={classes.headerNotifications}>
      <Tooltip title='New Payments'>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="Search"
          className={classes.button}
          // aria-controls="HeaderNotifications"
          aria-haspopup="true"
          onClick={toggleDrawer(true, true)}
        >
          <Badge badgeContent={notificationState.payments.length} color="primary" classes={{ badge: classes.badge }}>
            <IconNotifications />
          </Badge>
        </IconButton>
      </Tooltip>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.button}
        aria-controls="HeaderNotifications"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Badge badgeContent={notificationState.notifications.length} color="secondary" classes={{ badge: classes.badge }}>
          <IconNotifications />
        </Badge>
      </IconButton>
      <Menu
        id="HeaderNotifications"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        classes={{ paper: classes.notifications }}
      >
        <List className={classes.notifications}>
          {notifications.map((notification, index) => (
            <ListItem button alignItems="flex-start" key={index}>
              {/* <ListItemAvatar>
                <Avatar alt={notification.user.name} src={notification.user.image} />
              </ListItemAvatar> */}
              <ListItemText
                primary={notification.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {notification.user.name}
                    </Typography>
                    { }{notification.content}
                  </React.Fragment>
                }
              />
            </ListItem>
          ))}
        </List>
        <ListItem button alignItems="flex-start" key={notificationState.notifications.length}>
          <ListItemText
            primary={notificationState.notifications.length}
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                >
                  {notificationState.notifications.length}
                </Typography>
                { }{notificationState.notifications.length.toString()}
              </React.Fragment>
            }
          />
        </ListItem>
      </Menu>
      < React.Fragment key="right">
        <Drawer anchor='right' open={isPaymentsDrawerOpen} onClose={toggleDrawer(false, false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  )
}




// const HeaderNotificationsContent = () => {
//   const classes = useStyles()

//   return <List className={classes.notifications}></List>
// }

const useStyles = makeStyles(theme => ({
  headerNotifications: {
    marginRight: 23,
    // position: 'relative',
    // position: 'absolute'
  },
  notificationsContainer: {
    // position: 'relative',
  },
  button: {
    marginRight: 10
  },
  badge: {
    color: '#fff',
  },
  notifications: {
    // width: 360,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}))

const mapStateToProps = (state: any) => {
  return {
    success: state.drivers.isAdded,
    brands: state.brands.brands,
    tonnages: state.vehicles.tonnages,
    truckBodies: state.vehicles.truckBodies,
    vehicleTypes: state.vehicles.vehicleTypes,
  };
}

const AddToast: React.FC = () => {
  const { addToast } = useToasts();

  return (
    <div>
      <button
        onClick={() =>
          addToast(
            'Toast',
            {
              appearance: 'error',
              autoDismiss: true,
            },
            () => { },
          )
        }
      >
        Add Toast
          </button>
    </div>
  );
};

export default connect(mapStateToProps)(HeaderNotifications);

