import React from 'react';
import { makeStyles, createStyles, withStyles, Theme, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Typography } from '@material-ui/core';

const BorderLinearProgress = withStyles((theme: Theme) =>
    createStyles({
        root: {
            height: 10,
            borderRadius: 5,
            width:"80%"
        },
        // colorPrimary: {
        //     backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
        // },
        // bar: {
        //     borderRadius: 5,
        //     backgroundColor: '#b2c6c5',
        // },
    }),
)(LinearProgress);

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    colorPrimary: {
        backgroundColor: "#b2c6c5"
    },
    barColorPrimary: {
        backgroundColor: "#c99c33"
    },
    padding: {

    }
});

interface ProgressBarHistoryProps {
    color: string,
    value: number,
    type: string
}

export default function ProgressBarHistory({ color, value, type }: ProgressBarHistoryProps) {
    const classes = useStyles();
    const theme = createMuiTheme({
        palette: {
            // secondary: {
            //     main: '#b2c6c5',
            // },
            primary: {
                main: color
            },
        },

    })

    return (
        <div className={classes.root}>
            <MuiThemeProvider theme={theme}>
                <Typography variant="overline">
                    {type}
                </Typography>
                <BorderLinearProgress variant="determinate" value={value} color="primary" />
            </MuiThemeProvider>
        </div>
    );

    const styles = ({

    })
}