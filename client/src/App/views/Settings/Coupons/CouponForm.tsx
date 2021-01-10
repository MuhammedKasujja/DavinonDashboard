import React from "react";
// @material-ui/core components
import { makeStyles, StyleRules } from "@material-ui/core/styles";
// core components
import GridItem from "../../../components/Grid/GridItem";
import GridContainer from "../../../components/Grid/GridContainer";
import Button from "../../../components/CustomButtons/Button";
import Card from "../../../components/Card/Card.js";
import CardHeader from "../../../components/Card/CardHeader.js";
import CardBody from "../../../components/Card/CardBody.js";
import CardFooter from "../../../components/Card/CardFooter.js";
import { useState } from "react"
import MenuItem from "@material-ui/core/MenuItem"
import SelectInput from "../../../components/CustomInput/SelectInput";
import { showToast, ToastComponent } from "../../../components/Alerts/Alerts"
import TSButton from "App/components/CustomButtons/TSButton";
import CustomInputText from "App/components/CustomInput/input";
import DatepickerInput from "App/components/CustomInput/DatepickerInput";
import { useDispatch } from "react-redux";
import { saveCoupon } from "_store/Coupons/actions";

const years = ['Enabled', 'Disabled'];
const discountStatusList = years.map((val) => {
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

const useStyles = makeStyles(styles);

export interface CouponFormProps {
    success?: boolean
}

function CouponForm({ success }: CouponFormProps) {
    const dispatch = useDispatch()
    const classes = useStyles();
    const [discount, setDiscount] = useState(0);
    const [activationDate, setActivationDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('')
    const [usageLimit, setUsageLimit] = useState(0)
    const [usedNumTimes, setUsedNumTimes] = useState(0)
    const [status, setStatus] = useState('Enabled');

    const handleSavePromoCode = () => {
        if (!usageLimit || !discount || !activationDate || !usedNumTimes || !status) {
            console.log({ 'Empty': 'Please wat are u doing' })
            showToast('Please fill  all fields')
        } else {
            dispatch(
                saveCoupon({
                    discount: discount, usageLimit: usageLimit, status: status,
                    activtionDate: activationDate, expiryDate: expiryDate
                })
            )
            // console.log({ 'Success': promoCode })
        }
    }

    React.useEffect(() => {
        //// class method {componentDidUpdate}////
        // console.log({ 'Success': props.success })
        // if (props.success === true) {
        // props.dispatch(addDriverSuccesss(false))
        // showToast('Driver Saved Successfully')
        // setMake('')
        // setExpiryDate('')
        // setUsageLimit(0)
        // setActivationDate('')
        // setDiscount('')
        // }

    })

    const newLocal = <DatepickerInput onDateChanged={(date: string) => {
        console.log({ NewDate: date });
    }} />;
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Promo Code</h4>
                        <p className={classes.cardCategoryWhite}>Add promo codes for trip discounts</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInputText id="discount"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${discount}`,
                                        type: 'number'
                                    }}
                                    labelText='Discount (%)'
                                    handleChange={(val) => {
                                        if (val === '')
                                            setDiscount(0)
                                        else
                                            setDiscount(parseInt(val))
                                    }} />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                                <CustomInputText id="Activation_Date"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${activationDate}`
                                    }}
                                    labelText='Activation Date'
                                    handleChange={(val) => {
                                        setActivationDate(val)
                                    }} />
                                {/* {newLocal} */}
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={6} sm={6} md={4}>
                                <CustomInputText id="Expiry_Date"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${expiryDate}`,
                                    }}
                                    labelText='Expiry Date'
                                    handleChange={(val) => {
                                        setExpiryDate(val)
                                    }} />
                            </GridItem>
                            <GridItem xs={6} sm={6} md={4}>
                                <CustomInputText id="Usage_Limit"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${usageLimit}`,
                                        type: 'number'
                                    }}
                                    labelText='Usage Limit'
                                    handleChange={(val) => {
                                        if (val === '')
                                            setUsageLimit(0)
                                        else
                                            setUsageLimit(parseInt(val))
                                    }} />
                            </GridItem>
                            <GridItem xs={6} sm={6} md={4}>
                                <SelectInput labelText="Status"
                                    handleChange={(val: string) => {
                                        setStatus(val)
                                    }}
                                    value={status}
                                    id="choose-status"
                                    items={discountStatusList}
                                    formControlProps={{
                                        fullWidth: true
                                    }} />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <TSButton color="primary" onClick={handleSavePromoCode}>Save</TSButton>
                        <ToastComponent />
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>

    )
}

export default CouponForm;