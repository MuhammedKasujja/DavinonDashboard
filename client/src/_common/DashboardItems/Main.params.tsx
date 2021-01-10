import React from 'react'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Tooltip from "@material-ui/core/Tooltip"
import { Theme } from '_theme'
import { makeStyles } from '@material-ui/core/styles'


interface DashboardMenuItemProps {
  icon: JSX.Element,
  title: string,
  value: string,
  color?: string
}

const handleClick = (event: React.MouseEvent) => {
  console.log({ 'EventTarget': event.currentTarget });
}

const DashboardMenuItem = ({ icon, title, value, color }: DashboardMenuItemProps) => {
  const classes = useStyles()
  const defaultProps = {
    bgcolor: 'background.paper',
    m: 1,
    style: { height: '100px' },
    borderColor: color === null ? '#c99c33ff' : color,
    borderRadius: 5,
    boxShadow: "1"
  };
  return (
    // <Tooltip title={'Trips'}>
    <Grid item xs={12} md={6} lg={3} >
      <Box borderLeft={5} {...defaultProps} onClick={handleClick}>
        <Grid container item xs={12} spacing={1}>
          <Grid item xs={4} >
            <Paper className={classes.paper} >
              {icon}
            </Paper>
          </Grid>
          <Divider orientation="vertical" flexItem className={classes.divider} />
          <Grid container item xs={7} alignItems="center">
            <Paper className={classes.paperContainer} >
              <Grid container item xs={12} spacing={1} alignItems="center">
                <Typography variant="subtitle1">
                  {title}
                </Typography>
                <Typography variant="h5" className={classes.values}>
                  {value}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )

}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flex: 1,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderLeft: 10,
    borderRadius: 20,
    boxShadow: "1"
  },
  paperContainer: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderLeft: 10,
    borderColor: '#000',
    borderRadius: 20,
    boxShadow: "1",
  },
  divider: {
    height: "50px",
    marginTop: "25px"
  },
  icon: {
    fontSize: 45,
    color: "#c99c33ff"
  },
  values: {
    fontSize: "20px",
    fontWeight: "bold",

  }
}))



export default DashboardMenuItem