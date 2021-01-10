import React from "react"
import classNames from "classnames";
import MoreIcon from "@material-ui/icons/MoreVert"
import IconButton from "@material-ui/core/IconButton"
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(styles);

export function MoreButton(props) {
    const classes = useStyles();
    const history = useHistory();

    const [openNotification, setOpenNotification] = React.useState(null);
    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.currentTarget);
        }
    };
    const handleCloseNotification = () => {
        setOpenNotification(null);
        // history.push(`trips/edit/`)
    };
    return <IconButton onClick={handleClickNotification}>
        <MoreIcon />
        <Poppers
            open={Boolean(openNotification)}
            anchorEl={openNotification}
            transition
            disablePortal
            className={
                classNames({ [classes.popperClose]: !openNotification }) +
                " " +
                classes.popperNav
            }>
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    id="notification-menu-list-grow"
                    style={{
                        transformOrigin:
                            placement === "bottom" ? "center top" : "center bottom"
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleCloseNotification}>
                            <MenuList role="menu">
                                <MenuItem
                                    onClick={handleCloseNotification}
                                    className={classes.dropdownItem}>
                                    Attach Car
                                </MenuItem>
                                <MenuItem
                                    onClick={handleCloseNotification}
                                    className={classes.dropdownItem}>
                                    Modify
                                </MenuItem>
                                <MenuItem
                                    onClick={handleCloseNotification}
                                    className={classes.dropdownItem}>
                                    Delete
                                 </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Poppers>
    </IconButton>
}
