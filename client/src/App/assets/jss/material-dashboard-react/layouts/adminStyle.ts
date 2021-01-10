import { Theme } from "@material-ui/core/styles";
import {
  drawerWidth,
  transition,
  container
} from "../../material-dashboard-react";

const appStyle = (theme:Theme) => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    marginTop: "60px",
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    ...transition,
    // maxHeight: "100%",
    maxHeight:`calc(100% - 55px)`,
    width: "100%",
    overflowScrolling: "touch",
  },
  content: {
    // marginTop: "70px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)"
  },
  container,
  map: {
    marginTop: "70px"
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    // backgroundColor:'black'
  },
  title: {
    flexGrow: 1,
  },
});

export default appStyle;
