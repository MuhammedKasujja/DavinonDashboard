import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { useState } from "react"
import MenuItem from "@material-ui/core/MenuItem"
import SelectInput from "../../components/CustomInput/SelectInput";
import AutocompleteInput from "../../components/CustomInput/AutocompleteInput"
import CircularProgress from "@material-ui/core/CircularProgress"
import { connect } from "react-redux"
import { fetchCarTypes, fetchTruckBodies, fetchTruckTonnages } from "../../../_store/truck/actions"
import { addBrands, fetchBrands,saveBrandModel } from "../../../_store/CarBrands/actions";

const listCylinders = ['None', '2', '3', '4', '5', '6', '8', '10', '12', '16']

const carCylinderHeads = listCylinders.map((val) => {
    var _value = val;
    if (val === 'None') {
        _value = '';
    }
    return <MenuItem key={val} value={_value}>{val === 'None' ? <em>None</em> : val}</MenuItem>
});

const styles = {
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
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

const useStyles = makeStyles(styles);

function RegisterCarBrand(props) {
    const classes = useStyles();
    const [brand, setBrand] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [carType, setCarType] = useState('');
    const [fuel, setFuel] = useState('');
    const [seats, setSeats] = useState('');
    const [cylinders, setCylinders] = useState('');
    const [truckBody, setTruckBody] = useState('');
    const [truckBodyList, setTruckBodyList] = useState([]);

    const handleSaveBrand = () => {
        // console.log({ "Brand": brand })
        var model = {
            make: brand,
            models: []
        }
        props.dispatch(addBrands(model))
    }
    const handleSaveCarModel = () => {
        var modelObj = {
            name: model,
            type: carType,
            seats: seats,
            cylinders: cylinders,
            truckBody: truckBody
            // "driveTrain":driveTrain
        }
        var savedBrand = {
            id: make,
            models: [modelObj]
        }
        props.dispatch(saveBrandModel(savedBrand))
        // service.CarModelsService.editBrandModel(savedBrand).then((data) => {
        //     console.log({ "Msg": data })
        //     console.log("Data saved successfully")
        //     setModel('')
        //     setSeats('')
        //     setCylinders('')
        //     setFuel('')
        //     setCarType('')
        //     setTruckBody('')
        // });
    }
    React.useEffect(() => {
        props.dispatch(fetchBrands())
        props.dispatch(fetchCarTypes())
        props.dispatch(fetchTruckBodies())
        props.dispatch(fetchTruckTonnages())

    }, [])
    React.useEffect(() => {
        setTruckBodyList(props.truckBodies)
    }, [props])
    const cars = []
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Register Models</h4>
                        <p className={classes.cardCategoryWhite}>add new models</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={6} sm={6} md={6}>
                                {props.brands !== null ? <AutocompleteInput labelText="Brand"
                                    id="choose-brand"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    options={props.brands}
                                    getLabel={(opt) => opt.make}
                                    handleChange={(val) => {
                                        // console.log(val.id)
                                        if (val !== null)
                                            setMake(val.id)
                                        else
                                            setMake('')
                                        setTruckBody('')
                                    }} /> : <CircularProgress size={20} />}
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6}>
                                <CustomInput onChange={(val) => {
                                    setModel(val);
                                }}
                                    labelText="Model"
                                    id="model"
                                    formControlProps={{
                                        fullWidth: true,
                                    }}
                                    inputProps={{
                                        value: `${model}`
                                    }}
                                />
                            </GridItem>

                        </GridContainer>
                        {(props.vehicleTypes !== null && props.vehicleTypes !== undefined) ? <div>{
                            props.vehicleTypes.forEach(element => {
                                cars.push(<MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)
                            })
                            // setListCarType(cars)
                        }</div> : <div />}
                        {props.vehicleTypes !== null ? <GridContainer>
                            <GridItem xs={6} sm={6} md={6}>
                                <SelectInput labelText="Car Type"
                                    handleChange={(val) => {
                                        setTruckBody('')
                                        setCarType(val)
                                    }}
                                    items={cars}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${carType}`
                                    }} />
                            </GridItem>
                            {carType === 'Truck' &&
                                <GridItem xs={12} sm={12} md={6}>
                                    {props.truckBodies !== null ?
                                        <AutocompleteInput labelText="Truck Body"
                                            id="choose-truck-body"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            options={props.truckBodies}
                                            getLabel={(opt) => opt.name}
                                            handleChange={(val) => {
                                                // console.log(val.id)
                                                if (val !== null)
                                                    setTruckBody(val.name)
                                                else
                                                    setTruckBody('')
                                                // console.log({ 'TrackBody': listDriveTrains(val.tonnage) })
                                            }} /> : <div></div>}
                                </GridItem>}
                        </GridContainer> : <div />}
                        <GridContainer>
                            {/* <GridItem xs={6} sm={6} md={6}>
                                    <SelectInput labelText="Car Type"
                                        handleChange={(val) => {
                                            // setDriveTrain('')
                                            setTruckBody('')
                                            setCarType(val)
                                        }}
                                        id="choose-car-type"
                                        value={carType}
                                        items={carTypes}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                    />
                                </GridItem>
                                {carType === 'Truck' ? <GridItem xs={6} sm={6} md={6}>
                                    <AutocompleteInput labelText="Truck Body"
                                        id="choose-truck-body"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        value={truckBody}
                                        options={props.truckBodies}
                                        getLabel={(opt) => opt.name}
                                        handleChange={(val) => {
                                            // console.log(val.id)
                                            if (val !== null)
                                                setTruckBody(val.name)
                                            else
                                                setTruckBody('')
                                            // console.log({ 'TrackBody': listDriveTrains(val.tonnage) })
                                        }} /></GridItem> : <div></div>} */}

                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={6} sm={6} md={6}>
                                <CustomInput onChange={(val) => {
                                    setSeats(val);
                                }}
                                    labelText="Seats"
                                    id="seats"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        value: `${seats}`
                                    }}
                                />
                            </GridItem>
                            <GridItem xs={6} sm={6} md={6}>
                                <SelectInput labelText="Cylinders"
                                    handleChange={(val) => {
                                        setCylinders(val)
                                    }}
                                    value={fuel}
                                    id="choose-car-cylinders"
                                    value={cylinders}
                                    items={carCylinderHeads}
                                    formControlProps={{
                                        fullWidth: true
                                    }} />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={handleSaveCarModel}>Submit</Button>
                    </CardFooter>
                </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>Car Brands</h4>
                        <p className={classes.cardCategoryWhite}>add new brands</p>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput onChange={(val) => {
                                    setBrand(val);
                                }}
                                    labelText="Brand"
                                    id="brand"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        disabled: false,
                                        value: `${brand}`
                                    }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={handleSaveBrand}>Save</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
const mapStateToProps = (state) => {
    return {
        brands: state.brands.brands,
        tonnages: state.vehicles.tonnages,
        truckBodies: state.vehicles.truckBodies,
        vehicleTypes: state.vehicles.vehicleTypes
    };
}
export default connect(mapStateToProps)(RegisterCarBrand);