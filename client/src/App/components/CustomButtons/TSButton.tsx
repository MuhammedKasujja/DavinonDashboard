import React from "react";
import { Button as MuiButton, createStyles, makeStyles, Theme } from "@material-ui/core";
import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        margin: {
            margin: theme.spacing(1),
            position:'relative'
        },
        padding:{
          paddingLeft: "10",
          paddingRight:"10"
        },
    }),
);

const TSButton: React.FC<MuiButtonProps> = ({ children, ...props}) => {
  const classes = useStyles();
  return (
    <MuiButton color='primary' variant="contained" {...props} className={classes.margin} >
       {children}
    </MuiButton>
  )
}

export default TSButton;