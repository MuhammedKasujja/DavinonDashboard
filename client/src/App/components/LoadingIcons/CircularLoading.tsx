import React from "react"
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      position: 'relative'
    },
  }),
);

const CircularProgressIndicator =()=>{
    const classes = useStyles()
    return(
        <CircularProgress size={20} color='secondary' className={classes.progress} />
    )
}

export default CircularProgressIndicator
