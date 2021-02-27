import React from "react";
// @material-ui/core components
import { createStyles, makeStyles, StyleRules, Theme } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import { useState } from "react"
import MenuItem from "@material-ui/core/MenuItem"
import SelectInput from "../../../components/CustomInput/SelectInput";
import { showToast, ToastComponent } from "../../../components/Alerts/Alerts"
import CustomInputText from "App/components/CustomInput/input";
import TSButton from "App/components/CustomButtons/TSButton";

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
    const [message, setMessage] = useState('');
    const [recievers, setRecievers] = useState<[]>();

    const handleSendNotification = () => {
        if (message && recievers) {

        }
    }

    React.useEffect(() => {


    })

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Send Notification</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInputText id="message"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${message}`
                                    }}
                                    labelText='message'
                                    handleChange={(val) => {
                                        setMessage(val)
                                    }} />
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
                        <TSButton color="primary" onClick={handleSendNotification}>Send</TSButton>
                        <ToastComponent />
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

    )
}

export default PushNotificationForm;