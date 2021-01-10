import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks";
import RTLNavbarLinks from "./RTLNavbarLinks";

import styles from "../../assets/jss/material-dashboard-react/components/headerStyle";
import { connect } from "react-redux"
import { newTripsNotification } from "../../redux/actions/notificationActions"
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link as RouterLink } from 'react-router-dom';
import { Route } from 'react-router';

const LinkRouter = (props) => <Link {...props} component={RouterLink} />;

const useStyles = makeStyles(styles);
const url = process.env.REACT_APP_BASE_URL

function Header(props) {
  const classes = useStyles();
  const [eventStream, setEventStream] = React.useState(new EventSource(`${url}api/trips/stream/`));
  function makeBrand() {
    var name;
    var links = {}
    props.routes.map(prop => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        name = props.rtlActive ? prop.rtlName : prop.name;
      }
      links[prop.layout + prop.path] = prop.name
      return null;
    });
    // console.log(links)
    // return name;
    return links;
  }
  const { color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  React.useEffect(() => {
    // ComponentDidMount
    eventStream.onmessage = e => {
      const data = JSON.parse(e.data);
      console.log(data);
      props.dispatch(newTripsNotification(data.total))
    }
    console.log('component mounted!')
    //Updated ui every 5 seconds
    let i = 0;
    let interval = setInterval(() => {
      if (i < 10000) {
        i++;
        console.log("fetching data from API");
      }
      else {
        clearInterval(interval)
      }

    }, 5000);

  }, [])
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          {/* Setting navigation headers*/}
          {/* <Breadcrumbs aria-label="breadcrumb" className={classes.title}>
            <Link color="inherit" href="#" >
              {makeBrand()}
            </Link>
            <Link color="inherit" href="/getting-started/installation/" >
              Core
            </Link>
            <Typography color="textPrimary">Breadcrumb</Typography>
          </Breadcrumbs> */}
        <div className={classes.breadCrumb}>
          <Route exact>
            {({ location }) => {
              const pathnames = location.pathname.split('/').filter((x) => x);
              return (
                <Breadcrumbs aria-label="breadcrumb">
                  <LinkRouter color="inherit" to="/dashboard">
                    Dashboard
                </LinkRouter>
                  {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                    return last ? (
                      <Typography color="textPrimary" key={to}>
                        {makeBrand()[to]}
                      </Typography>
                    ) : (
                        <LinkRouter color="inherit" to={to} key={to}>
                          {makeBrand()[to]}
                        </LinkRouter>
                      );
                  })}
                </Breadcrumbs>
              );
            }}
          </Route>
          </div>

          {/* <Button color="transparent" href="#" className={classes.title}>
            {makeBrand()}
          </Button> */}
        </div>
        <Hidden smDown implementation="css">
          {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = (state) => {
  return {
    trips: state.brands.trips
  };
}
export default connect(mapStateToProps)(Header);
