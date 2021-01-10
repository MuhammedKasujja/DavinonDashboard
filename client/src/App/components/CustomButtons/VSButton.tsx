import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Button, { ButtonProps } from "@material-ui/core/Button";

import styles from "../../assets/jss/material-dashboard-react/components/buttonStyle";

const useStyles = makeStyles(styles);

export interface Props {
    color:
    "primary" |
    "info" |
    "success" |
    "warning" |
    "danger" |
    "rose" |
    "white" |
    "transparent"
    ,
    size: "sm" | "lg",
    simple?: boolean,
    round?: boolean,
    disabled?: boolean,
    block?: boolean
    link?: boolean
    justIcon?: boolean
    className: string,
    // use this to pass the classes props from Material-UI
    muiClasses?: object,
    children: React.ReactNode
    // onClick:
}
const VSButton: React.FC<Props> = (props) => {
    const classes = useStyles();
    const {
        color,
        round,
        children,
        disabled,
        simple,
        size = 'sm',
        block,
        link,
        justIcon,
        className,
        muiClasses,
        ...rest
    } = props;
    const btnClasses = classNames({
        [classes.button]: true,
        [classes[size]]: size,
        [classes[color]]: color,
        [classes.round]: round,
        [classes.disabled]: disabled,
        [classes.simple]: simple,
        [classes.block]: block,
        [classes.link]: link,
        [classes.justIcon]: justIcon,
        [className]: className
    });
    return (
        <Button {...rest} classes={muiClasses} className={btnClasses}>
            {children}
        </Button>
    );
}
VSButton.defaultProps ={}
export default VSButton
