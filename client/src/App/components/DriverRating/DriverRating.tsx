import { makeStyles, createStyles, StyleRules } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import React from "react";
import StarBorderIcon from '@material-ui/icons/StarBorder';

const styles: StyleRules = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    personIcon: {
        '& svg': {
            fontSize: 100
        }
    }
};
const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
}

const useStyles = makeStyles(() => createStyles(styles))

interface DriverRatingProps{
  rate:number|null
}


const DriverRating = (props:DriverRatingProps) => {
    const {rate} = props
    const classes = useStyles();
    const [rating, setRating] = React.useState<number | null>(rate);
    const [hover, setHover] = React.useState(-1);
    return (
        <Box component="fieldset" mb={3} borderColor="transparent">
            <div className={classes.root}>
                <Rating size="large"
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    onChange={(_, newValue) => {
                        setRating(newValue);
                    }}
                    onChangeActive={(_, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
                {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
            </div>
        </Box>);
}

export default DriverRating