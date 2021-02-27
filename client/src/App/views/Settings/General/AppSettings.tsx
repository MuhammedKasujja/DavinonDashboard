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
import CustomInputText from "App/components/CustomInput/input";
import VSButton from "App/components/CustomButtons/VSButton";
import TSButton from "App/components/CustomButtons/TSButton";
import { useDispatch, useSelector } from "react-redux";
import { fetchAppSettings, saveAppSettingsAction } from "_store/AppSettings/actions";
import { RootStore } from "_store/store";

const now = new Date().getUTCFullYear();
const years = Array(now - (now - 11)).fill('').map((v, idx) => now - idx);
const listYears = years.map((val) => {
    return <MenuItem key={val} value={val.toString()}>{val.toString()}</MenuItem>
})

const currencyOptions = ['UGX', 'USD', 'KSH', 'TSH']

const currencyTypes = currencyOptions.map((val) => {
    return <MenuItem key={val} value={val}>{val}</MenuItem>
});

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

export interface AppSettingsFormProps {

}

function AppSettingsForm(props: AppSettingsFormProps) {
    const dispatch = useDispatch()
    const appSettings = useSelector(
        (state: RootStore) => state.app.settings,
    )
    const classes = useStyles();
    const [oneSignalApiKey, setOneSignalApiKey] = useState(appSettings.oneSignalApiKey);
    const [stripeApiSecretKey, setStripeApiSecretKey] = useState(appSettings.stripeApiSecretKey);
    const [stripeApiPublishableKey, setStripeApiPublishableKey] = useState(appSettings.stripeApiPublishableKey);
    const [email, setEmail] = useState(appSettings.email);
    const [currency, setCurrency] = useState(appSettings.currency);
    const [costPerKm, setCostPerKm] = useState(appSettings.costPerKm);

    const handleSaveSettings = () => {
        dispatch(saveAppSettingsAction({
            oneSignalApiKey: oneSignalApiKey, email: email, stripeApiPublishableKey: stripeApiPublishableKey,
            stripeApiSecretKey: stripeApiSecretKey, currency: currency, isOneSignalLive: false, isStripeLive: false,
            costPerKm: costPerKm
        }))
    }
    // Trigger only once with empty square brackets 
    React.useEffect(() => {
        dispatch(fetchAppSettings())
    }, [])
  
    // Fire when one of the array variables change
    React.useEffect(() => {
        setStripeApiSecretKey(appSettings.stripeApiSecretKey)
        setCurrency(appSettings.currency)
        setStripeApiPublishableKey(appSettings.stripeApiPublishableKey)
        setOneSignalApiKey(appSettings.oneSignalApiKey)
        setCostPerKm(appSettings.costPerKm)
        setEmail(appSettings.email)

    }, [appSettings.stripeApiPublishableKey, appSettings.currency,
    appSettings.stripeApiSecretKey, appSettings.costPerKm,
    appSettings.oneSignalApiKey, appSettings.email])

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Settings</h4>
                        <p className={classes.cardCategoryWhite}>App general settings</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <GridContainer>

                                    <GridItem xs={6} sm={6} md={6}>
                                        <CustomInputText id="oneSignalApiKey"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: `${oneSignalApiKey}`
                                            }}
                                            labelText='OneSignal Api Key'
                                            handleChange={(val) => {
                                                setOneSignalApiKey(val)
                                            }} />
                                    </GridItem>
                                    <GridItem xs={6} sm={6} md={4}>
                                        <CustomInputText id="email"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: `${email}`,
                                                type: 'email'
                                            }}
                                            labelText='Email'
                                            handleChange={(val) => {
                                                setEmail(val)
                                            }} />
                                    </GridItem>
                                    <GridItem xs={6} sm={6} md={2}>
                                        <SelectInput labelText="Currency"
                                            handleChange={(val: string) => {
                                                setCurrency(val)
                                            }}
                                            value={currency}
                                            id="choose-currency"
                                            items={currencyTypes}
                                            formControlProps={{
                                                fullWidth: true
                                            }} />
                                        {/* <CustomInputText id="currency"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: `${currency}`
                                            }}
                                            labelText='Currency'
                                            handleChange={(val) => {
                                                setCurrency(val)
                                            }} /> */}
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={6} md={12}>
                                        <CustomInputText id="stripeApiPublishableKey"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: `${stripeApiPublishableKey}`
                                            }}
                                            labelText='Stripe Api Publishable Key'
                                            handleChange={(val) => {
                                                setStripeApiPublishableKey(val)
                                            }} />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={12}>
                                        <CustomInputText id="stripeApiSecretKey"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: `${stripeApiSecretKey}`
                                            }}
                                            labelText='Stripe Api Secret Key'
                                            handleChange={(val) => {
                                                setStripeApiSecretKey(val)
                                            }} />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={6} sm={6} md={4}>
                                        <CustomInputText id="costPerKm"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                value: `${costPerKm}`,
                                                type: 'number'
                                            }}
                                            labelText='Cost Per KM'
                                            handleChange={(val) => {
                                                setCostPerKm(parseInt(val))
                                            }} />
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        {/* <VSButton color="primary" onClick={handleSaveCar}>Save</VSButton> */}
                        <TSButton color="primary" onClick={handleSaveSettings}>Save</TSButton>
                        <ToastComponent />
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

    );
}

export default AppSettingsForm;