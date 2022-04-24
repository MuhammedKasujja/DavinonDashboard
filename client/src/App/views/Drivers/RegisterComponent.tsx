import React from "react";
import { createStyles, makeStyles, StyleRules } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import GenderInput from "../../components/CustomInput/GenderInput";
// import DatepickerInput from "../../components/CustomInput/DatepickerInput";

import { useState } from "react"
import PhoneInput from "App/components/CustomInput/PhoneInput";
import RegisterCar from "../Trucks/RegisterCar";
import CustomInputText from "App/components/CustomInput/input";
import { Driver } from "_store/driver/types";
import { DriverRating, DriverState } from "_types/Enums";
import DatepickerInput from "App/components/CustomInput/DatepickerInput";
import { Typography } from "@material-ui/core";

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
    }
};

const useStyles = makeStyles(() => createStyles(styles))

const DriverRegisterComponent: React.FC<any> = () => {
    const classes = useStyles('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [telephone, setTelephone] = useState('+256');
    const [dateofBirth, setDateofBirth] = useState('');
    const [nin, setNin] = useState('')
    const [city, setCity] = useState('')

    const getDriver: Driver = {
        name: `${firstname} ${lastname}`,
        telephone: telephone,
        email: email,
        gender: gender,
        birthday: dateofBirth,
        nin: nin,
        city: city,
        charisma: DriverRating.Good,
        oneSignalPlayerID: '',
        status: DriverState.Offline,
        photo: {
            isOnline: true,
            url: 'http://www.example.com/12345678/photo.png'
        },
        createdOn: Date.now(),
        isOnline: false,
        available: false
    };

    React.useEffect(() => {
        //// class method {componentDidUpdate}////
        // console.log({ 'Success': props.success })
        // if (props.success === true) {
        //     setFirstname('')
        //     setLastname('')
        //     setGender('')
        //     setNin('')
        //     setTelephone('+256')
        //     setCity('')
        //     setEmail('')
        //     setDoB('')
        // }


    }, [])// [props.success])

    return (
        <div>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Typography>Driver Details</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        {/* <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Register Driver</h4>
                            <p className={classes.cardCategoryWhite}>Insert driver info</p>
                        </CardHeader> */}
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInputText handleChange={(val) => {
                                        setFirstname(val);
                                    }}
                                        labelText="Firstname"
                                        id="Firstname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${firstname}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInputText handleChange={(val) => {
                                        setLastname(val);
                                    }}
                                        labelText="Lastname"
                                        id="Lastname"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${lastname}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <PhoneInput onChange={(val: string) => {
                                        console.log(val)
                                        setTelephone(val);
                                    }}
                                        labelText="Telephone"
                                        id="telephone"
                                        inputProps={{
                                            value: `${telephone}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInputText handleChange={(val) => {
                                        setEmail(val);
                                    }}
                                        labelText="Email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            type: 'email',
                                            value: `${email}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInputText handleChange={(val) => {
                                        setCity(val);
                                    }}
                                        labelText="City"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${city}`
                                        }}
                                    />
                                </GridItem>

                                <GridItem xs={12} sm={12} md={4}>
                                    <GenderInput onGenderChanged={(val: string) => {
                                        setGender(val)
                                        // console.log(val)
                                    }} />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <DatepickerInput onDateChanged={(date: string) => {
                                        console.log(date)
                                        setDateofBirth(date)
                                    }} />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInputText handleChange={(val) => {
                                        setNin(val);
                                    }}
                                        labelText="National ID (NIN)"
                                        id="nin"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${nin}`
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Typography>Vehicle Information</Typography>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <RegisterCar driver={getDriver} />
                </GridItem>
            </GridContainer>
        </div>
    );
}

export default DriverRegisterComponent
