import React from "react";
// @material-ui/core components
import { createStyles, makeStyles, StyleRules } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { useSelector } from "react-redux"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import TSButton from "App/components/CustomButtons/TSButton";
import { RootStore } from "_store/store";
import DialogAttachCarToDriver from "../Trucks/DialogAttachCarToDriver";
import DriverRating from "App/components/DriverRating";
import Typography from "@material-ui/core/Typography";
import DriverTripsTable from "./DriverTripsTable";

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
};

const useStyles = makeStyles(() => createStyles(styles))

const DriverProfile: React.FC<any> = () => {
    const classes = useStyles();
    const driver = useSelector(
        (state: RootStore) => state.drivers.localDriver,
    )

    const [truck, setTruck] = React.useState(driver && (driver.trucks && driver.trucks[0]))

    React.useEffect(() => {
        // console.log('component mounted')

        // return a function to execute at unmount
        return () => {
            // console.log('component will unmount')
            //dispatch(addLocalDriver(null))
            //dispatch(isTableFiltered(false))
        }
    }, []) // notice the empty array
    return (
        <PageContainer>
            <PageToolbar
                title={`Drivers/${driver && driver.name}`}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>Profile</h4>
                            {/* <p className={classes.cardCategoryWhite}>Complete yo profile</p> */}
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Name"
                                        id="company-disabled"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.name : null}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Email address"
                                        id="email-address"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.email : null}`
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="Telephone"
                                        id="telephone"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.telephone : null}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <CustomInput
                                        labelText="City"
                                        id="city"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.city : null}`
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Gender"
                                        id="gender"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.gender : null}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="National ID"
                                        id="national-id"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.nin : null}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={12} sm={12} md={4}>
                                    <CustomInput
                                        labelText="Date of Birth"
                                        id="dato-of-birth"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: true,
                                            value: `${driver ? driver.birthday : null}`
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="transparent"></Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={driver && driver.photo.url} alt="..." />
                            </a>
                            {/* <IconButton className={classes.personIcon}>
                <PersonIcon />
              </IconButton> */}

                        </CardAvatar>
                        <CardBody profile>
                            <DriverRating rate={driver === undefined ? null : driver.charisma} />
                            <h4 className={classes.cardTitle}>{driver != null ? driver.name : ''}</h4>
                            {(truck && truck !== undefined && truck.id !== null) ?
                                <div className={classes.cardCategory}> {truck.brand}  {truck.model}  {truck.type}</div> :
                                // <TSButton color="primary" onClick={() => {
                                //     setshowAttachVehicle(!showAttachVehicle)
                                //     // props.dispatch(isTableFiltered(true))
                                // }}>
                                //     {!showAttachVehicle ? 'Attach A car' : 'Cancle'}

                                // </TSButton>
                                <DialogAttachCarToDriver />
                            }
                            <h4 className={classes.cardTitle}>{truck ? `${truck.licencePlate}` : ''}</h4>
                            {/* <p className={classes.description}>
                                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p> */}
                            {truck ?
                                <TSButton color="primary" onClick={() => {
                                    setTruck(undefined)
                                }}>Remove car</TSButton>
                                : <div />}

                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} >
                    <Typography>Trips</Typography>
                    {driver && <DriverTripsTable trips={[]} />}
                </GridItem>
            </GridContainer>
        </PageContainer>
    );
}

export default DriverProfile