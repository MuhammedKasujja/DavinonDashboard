import React, { createRef, useEffect, useRef } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import TableTrucksWithoutDrivers, { TableTrucksWithoutDriversProps } from '../Trucks/TableTrucksWithoutDrivers';
import { RootStore } from '_store/store';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogAttachCarToDriver() {
    const tableRef = useRef<TableTrucksWithoutDriversProps>(null)
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const driver = useSelector(
        (state: RootStore) => state.drivers.localDriver,
    )

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (tableRef.current) {
            tableRef.current.onSave()
        }
    };

    useEffect(() => {
        console.log(tableRef.current)
    }, [tableRef])

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Assign a Car
      </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Attach car to {driver ? driver.name : ''}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
            </Button>
                    </Toolbar>
                </AppBar>
                <TableTrucksWithoutDrivers ref={tableRef} />
            </Dialog>
        </div>
    );
}
