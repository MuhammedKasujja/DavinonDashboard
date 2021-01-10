import React from "react";
// @material-ui/core components
import { createStyles, makeStyles, StyleRules, Theme } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import CustomInput from "../../../components/CustomInput/CustomInput";
import Button from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import { useState } from "react"
import MenuItem from "@material-ui/core/MenuItem"
import SelectInput from "../../../components/CustomInput/SelectInput";
import { showToast, ToastComponent } from "../../../components/Alerts/Alerts"

const now = new Date().getUTCFullYear();
const years = Array(now - (now - 11)).fill('').map((v, idx) => now - idx);
const listYears = years.map((val) => {
    return <MenuItem key={val} value={val.toString()}>{val.toString()}</MenuItem>
})

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
        fontWeight: "bold",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles((_theme: Theme) => createStyles(styles));

export interface PushNotificationFormProps {

}

function PushNotificationForm(props: PushNotificationFormProps) {
    const classes = useStyles();
    const [gearbox, setGearbox] = useState('');
    const [fuel, setFuel] = useState('');
    const [seats, setSeats] = useState('');
    const [cylinders, setCylinders] = useState('');
    const [color, setColor] = useState('');
    const [interiorColor, setInteriorColor] = useState('');
    const [year, setYear] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [driveTrain, setDriveTrain] = useState('');
    const [tonnage, setTonnage] = useState('');
    const [truckBody, setTruckBody] = useState('')

    const handleSaveCar = () => {
        if (!cylinders || !gearbox || !fuel || !color || !interiorColor || !driveTrain) {
            console.log({ 'Empty': 'Please wat are u doing' })
            showToast('Please fill  all fields')
        } else {
            var car = {
                "seats": seats,
                "cylinders": cylinders,
                "gearbox": gearbox,
                "fuel": fuel,
                "year": year,
                "color": color,
                "interior_color": interiorColor,
                "licencePlate": plateNumber,
                "driveTrain": driveTrain,
                "tonnage": tonnage,
                "truckBody": truckBody,
                "photo": {
                    "isOnline": true,
                    "url": 'assets/images/car/car.webp'
                },
                "status": true
            }


            // dispatch(saveDriver(map))
            // console.log({ 'Success': props.success })

        }
    }

    React.useEffect(() => {
        //// class method {componentDidUpdate}////
        // console.log({ 'Success': props.success })
        // if (props.success === true) {
        // props.dispatch(addDriverSuccesss(false))
        showToast('Driver Saved Successfully')
        // setMake('')
        setSeats('')
        setCylinders('')
        setFuel('')
        setGearbox('')
        // }

    })

    return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Car Info</h4>
                            <p className={classes.cardCategoryWhite}>add car details</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>

                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>


                                </GridItem>

                            </GridContainer>

                            <GridContainer>
                                <GridItem xs={6} sm={6} md={4}>

                                </GridItem>
                                <GridItem xs={6} sm={6} md={4}>

                                </GridItem>
                                <GridItem xs={6} sm={6} md={4}>

                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={3} sm={3} md={4}>

                                </GridItem>
                                <GridItem xs={3} sm={3} md={4}>

                                </GridItem>
                                <GridItem xs={3} sm={3} md={4}>

                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6}>

                                </GridItem>
                                <GridItem xs={6} sm={6} md={6}>

                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            {/* <Button color="primary" onClick={handleSaveCar}>Save</Button> */}
                            <ToastComponent />
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        
    )
}

export default PushNotificationForm;