import React from "react";
import { Button as MuiButton } from "@material-ui/core";
import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

interface Props{
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
}

interface ButtonProps extends Pick<MuiButtonProps, Exclude<keyof MuiButtonProps, "variant">> {  
    variant?: "outlined" | MuiButtonProps["variant"]
    // size: "small" | "large",
    // simple: boolean,
    // round: boolean,
    // disabled: boolean,
    // block: boolean
    // link: boolean
    // justIcon: boolean
    // className: string,
    // muiClasses?: object,
    children: React.ReactNode
}

const defaultProps = {};

const TSButton: React.FC<ButtonProps> = ({variant, children, ...props}) => {
  return (
    <MuiButton color='primary' variant={variant} {...props}>
       {children}
    </MuiButton>
  )
}

TSButton.defaultProps = defaultProps;

export default TSButton;