import React from 'react'
import clsx from 'clsx'

import { Link, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Divider from '@material-ui/core/Divider'

import IconArrowDropDown from '@material-ui/icons/ArrowDropDown'
import IconProfile from '@material-ui/icons/AccountBox'
import IconAccount from '@material-ui/icons/AccountBalance'
import IconSettings from '@material-ui/icons/Settings'
import IconLogout from '@material-ui/icons/ExitToApp'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '_store/Users/actions'
import { RootStore } from '_store/store'


const HeaderProfile = () => {
  const history = useHistory()
  const authState = useSelector(
    (state: RootStore) => state.auth,
  )

  const dispatch = useDispatch()

  const handleLogout = () => {
    setAnchorEl(null)
    dispatch(logout())
  }
  React.useEffect(()=>{
    if(!authState.user){
       history.replace('/')
    }
  },[authState.user])
  
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  
  const localUser = localStorage.getItem('user')
  const user = localUser !== null ? JSON.parse(localUser) : undefined
  if (!user) {
    return <div className={clsx('headerProfile', classes.headerProfile)} />
  }

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(event.currentTarget)
  }

  function handleClose() {
    setAnchorEl(null)
  }
  
  const userAvatar = () => {
    if (user && user.username)
      return (<Avatar
        className={classes.profileAvatar}
        alt={user && user.username.charAt(0)}
      // src="https://avatars3.githubusercontent.com/u/3959008?v=3&s=40"
      />)
    else
      return (<></>)
  }
  
  return (
    <div className={clsx('headerProfile', classes.headerProfile)}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="Search"
        className={classes.profileButton}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {userAvatar()}
        <span className={classes.profileName}>{user && user.username}</span>
        <IconArrowDropDown />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        elevation={1}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        classes={{
          paper: classes.profileMenu,
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="#">
          <ListItemIcon>
            <IconProfile />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="#">
          <ListItemIcon>
            <IconAccount />
          </ListItemIcon>
          <ListItemText primary="My Accounts" />
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/admin/settings">
          <ListItemIcon>
            <IconSettings />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <IconLogout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  headerProfile: {
    display: 'inline-flex',
  },
  profileButton: {
    borderRadius: 30,
    fontSize: '1.2rem',
    padding: 8,
  },
  profileAvatar: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  profileName: {
    fontWeight: 500,
    marginRight: 5,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  profileMenu: {
    marginLeft: '-16px',
  },
}))

export default HeaderProfile
