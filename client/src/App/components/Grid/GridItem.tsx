import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid, { GridProps } from "@material-ui/core/Grid";

const styles = {
    grid: {
        padding: "0 15px !important"
    }
};
export interface GridItemProps extends GridProps {
    // custom: string
}
const useStyles = makeStyles(styles);

const GridItem: React.FunctionComponent<GridItemProps> = (props) => {
    const classes = useStyles();
    const { children, ...rest } = props;
    return (
        <Grid item {...rest} className={classes.grid}>
            {props.children}
        </Grid>
    );
}

export default GridItem



