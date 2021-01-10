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
import { showToast, ToastComponent } from "../../components/Alerts/Alerts"
import { connect, useDispatch } from "react-redux"
import { addDriverSuccesss } from "../../redux/actions/driversActions"
import { saveDriver } from "../../../_store/driver/actions"
import { fetchCarTypes, fetchTruckBodies, fetchTruckTonnages } from "../../../_store/truck/actions"
import { fetchBrands } from "../../../_store/CarBrands/actions";
import NumberPlateInput from "App/components/CustomInput/NumberPlateInput";
import { saveVehicle } from "../../../_store/truck/actions"

const listCylinders = ['None', '2', '3', '4', '5', '6', '8', '10', '12', '16']

const carCylinderHeads = listCylinders.map((val) => {
    var _value = val;
    if (val === 'None') {
        _value = '';
    }
    return <MenuItem key={val} value={_value}>{val === 'None' ? <em>None</em> : val}</MenuItem>
});

const fuelTypes = [<MenuItem key="none_fuel" value="">
    <em>None</em>
</MenuItem>,
<MenuItem key="gasoline" value='Gasoline'>Gasoline</MenuItem>,
<MenuItem key="diesel" value='Diesel'>Desel</MenuItem>];


const gearboxes = [<MenuItem key="none_gear" value="">
    <em>None</em>
</MenuItem>,
<MenuItem key="Automatic" value='Automatic'>Automatic</MenuItem>,
<MenuItem key="Manual" value='Manual'>Manual</MenuItem>];

const colors = ['None',
    "Beige",
    'Black',
    'Blue',
    "Blown",
    'Gold',
    'Green',
    "Silver",
    'Orange',
    'Pink',
    "Purple",
    'Red',
    'Tan',
    "Teal",
    "White",
    "Yellow",]
const listColors = colors.map((val) => {
    var _value = val;
    if (val === 'None') {
        _value = '';
    }
    return <MenuItem key={val} value={_value}>{val === 'None' ? <em>None</em> : val}</MenuItem>
});
const now = new Date().getUTCFullYear();
const years = Array(now - (now - 11)).fill('').map((v, idx) => now - idx);
const listYears = years.map((val) => {
    return <MenuItem key={val} value={val.toString()}>{val.toString()}</MenuItem>
})

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

function RegisterDriverCar(props) {

    const dispatch = useDispatch()
    const classes = useStyles();
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [brandModels, setBrandModels] = useState([])
    const [carType, setCarType] = useState('')
    const [engineCapacity, setEngineCapacity] = useState('');
    const [gearbox, setGearbox] = useState('');
    const [fuel, setFuel] = useState('');
    const [seats, setSeats] = useState('');
    const [cylinders, setCylinders] = useState('');
    const [color, setColor] = useState('');
    const [interiorColor, setInteriorColor] = useState('');
    const [year, setYear] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [driveTrainList, setDriveTrainList] = useState([])
    const [driveTrain, setDriveTrain] = useState('');
    const [tonnage, setTonnage] = useState('');
    const [truckBody, setTruckBody] = useState('');
    const [driveTrainMenus, setDriveTrainMenus] = useState([])
    const [carSeatsMenus, setCarSeatsMenus] = useState([])
    const [driveTrainObjectsList, setDriveTrainObjectsList] = useState([])
    const [isCarTypeTruck, setIsCarTypeTruck] = useState(Boolean)

    const { getDriver, image
    } = props;
    const handleSaveCar = () => {
        if (!make || !model || !carType || !cylinders || !gearbox || !fuel || !color || !interiorColor || !driveTrain) {
            console.log({ 'Empty': 'Please wat are u doing' })
            showToast('Please fill  all fields')
        } else {
            var car = {
                "brand": make,
                "model": model,
                "type": carType,
                "seats": seats,
                "cylinders": cylinders,
                "gearbox": gearbox,
                "fuel": fuel,
                "year": year,
                "color": color,
                "interior_color": interiorColor,
                "licencePlate": plateNumber,
                "tankCapacity": engineCapacity,
                "driveTrain": driveTrain,
                "tonnage": tonnage,
                "truckBody": truckBody,
                "photo": {
                    "isOnline": true,
                    "url": 'assets/images/car/car.webp'
                },
                "status": true
            }
            var map;
            if (getDriver) {
                map = { "driver": getDriver(), "vehicle": car }
                dispatch(saveDriver(map))
            } else {
                if (image) {
                    const data = new FormData()
                    data.append('file', image, image.name)
                    data.append('licencePlate', plateNumber)
                    dispatch(saveVehicle(data))
                }
                map = { "vehicle": car }

            }

            // const data = new FormData()
            // data.append('file', image, image.name)
            // dispatch(saveVehicle(data))
            // console.log({ 'Success': props.success })

        }
    }
    React.useEffect(() => {
        dispatch(fetchBrands())
        dispatch(fetchCarTypes())
        dispatch(fetchTruckBodies())
        dispatch(fetchTruckTonnages())

    }, [])
    React.useEffect(() => {
        //// class method {componentDidUpdate}////
        // console.log({ 'Success': props.success })
        if (props.success === true) {
            dispatch(addDriverSuccesss(false))
            showToast('Driver Saved Successfully')
            // setMake('')
            setModel('')
            setSeats('')
            setCylinders('')
            setFuel('')
            setGearbox('')
            setCarType('')
            setYear('')
            setEngineCapacity('')
            setColor('')
            setInteriorColor('')
            setDriveTrainMenus([])
            setPlateNumber('')
            setBrandModels([])
            setModel('')
        }

    })
    const listModels = (make) => {
        if (props.brands) {
            setBrandModels([])
            setModel('')
            props.brands.map((brand) => {
                if (brand.id === make) {
                    //console.log({ "Modes": brand.models })
                    setBrandModels(brand.models)
                    setSeats('')
                    setCylinders('')
                    setFuel('')
                    setGearbox('')
                    setCarType('')
                    setTonnage('')
                    setTruckBody('')
                    setDriveTrain('')
                    setYear('')
                    setDriveTrainMenus([])
                }
            })
        }
    }

    const listDriveTrains = (tonnage) => {
        if (props.brands) {
            setDriveTrainList([])
            setDriveTrain('')
            props.tonnages.map((data) => {
                if (data.tonnage === tonnage) {
                    setDriveTrainList(data.drive_type)
                }
            })
        }
    }
    const cars = []
    const onCarTypeSelected = (type) => {

        if (type === "Truck") {
            setIsCarTypeTruck(true)
        }
        // Set vehicle drive train
        setDriveTrainList([])
        setDriveTrain('')
        setDriveTrainMenus([])
        setDriveTrainObjectsList([])
        setSeats('')
        setCarSeatsMenus([])
        props.vehicleTypes.map((data) => {
            if (data.name === type) {
                var driveTrainTypes = [];
                var listTrains = []
                var driveTrainObectsList = []
                data.types.forEach(t => {
                    driveTrainTypes.push(<MenuItem key={t.name} value={t.name}>{t.name}</MenuItem>)
                    listTrains.push(t.name)
                    driveTrainObectsList.push(t)
                })
                setDriveTrainMenus(driveTrainTypes)
                setDriveTrainList(listTrains)
                setDriveTrainObjectsList(driveTrainObectsList)
            }
        })

    }
    // Setting car seats based on the selected DriveTrain
    const onCarDriveTrainSelected = (train) => {
        // Set vehicle drive train
        // setDriveTrainObjectsList([])
        setSeats('')
        // clearing the array
        //driveTrainMenus.length = 0
        driveTrainObjectsList.map((data) => {
            console.log(data)
            if (data.name === train) {
                var driveTrainTypes = [];

                data.options.forEach(opt => {
                    console.log(opt)
                    driveTrainTypes.push(<MenuItem key={opt} value={opt}>{opt}</MenuItem>)
                    // listTrains.push(t.name)
                })
                setCarSeatsMenus(driveTrainTypes)
                // setDriveTrainList(listTrains)
            }
        })

    }
    return (
        <div>
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
                                    {props.brands !== null ? <AutocompleteInput labelText="Brand"
                                        id="choose-brand"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        // value={make}
                                        options={props.brands}
                                        getLabel={(opt) => opt.make}
                                        handleChange={(val) => {
                                            // console.log(val.id)
                                            if (val !== null)
                                                setMake(val.make)
                                            else
                                                setMake('')
                                            console.log({ 'TotalModels': listModels(val.id) })
                                            setDriveTrain('')
                                        }} /> : <CircularProgress size={20} />}
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <AutocompleteInput labelText="Model"
                                        id="choose-model"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        value={model}
                                        options={brandModels}
                                        getLabel={(model) => model.name}
                                        handleChange={(model) => {
                                            // console.log(val.id)
                                            if (model !== null) {
                                                setModel(model.name)
                                                // setCylinders(model.cylinders)
                                                // setGearbox(model.gearbox)
                                                // setSeats(model.seats)
                                                console.log(model.type)
                                                setCarType(model.type)
                                                // setFuel(model.fuel)
                                                onCarTypeSelected(model.type)
                                            }
                                            else
                                                setModel('')

                                        }}
                                    />
                                </GridItem>

                            </GridContainer>
                            {props.vehicleTypes && <div>{
                                props.vehicleTypes.forEach(element => {
                                    cars.push(<MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)
                                })
                                // setListCarType(cars)
                            }</div>}
                            {props.vehicleTypes !== null ? <GridContainer>
                                <GridItem xs={6} sm={6} md={4}>
                                    <SelectInput labelText="Car Type"
                                        handleChange={(val) => {
                                            setCarType(val)
                                            onCarTypeSelected(val);
                                        }}
                                        items={cars}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${carType}`
                                        }} />
                                </GridItem>
                                {carType !== 'Truck' ?
                                    <> <GridItem xs={12} sm={12} md={4}>
                                        <SelectInput labelText="Drive Train"
                                            handleChange={(val) => {
                                                // setDriveTrain(val)
                                                setDriveTrain(val)
                                                onCarDriveTrainSelected(val)
                                            }}
                                            id="choose-drive-train-car"
                                            value={driveTrain}
                                            items={driveTrainMenus}
                                            formControlProps={{
                                                fullWidth: true
                                            }} />
                                    </GridItem>
                                        <GridItem xs={12} sm={12} md={4}>
                                            <SelectInput labelText="Seats"
                                                handleChange={(val) => {
                                                    setSeats(val)
                                                }}
                                                id="choose-seats"
                                                value={seats}
                                                items={carSeatsMenus}
                                                formControlProps={{
                                                    fullWidth: true
                                                }} />
                                        </GridItem></> : <GridItem xs={12} sm={12} md={8}>
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

                            {carType !== '' && carType === 'Truck' ?
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={6}>
                                        {props.tonnages !== null ?
                                            <AutocompleteInput labelText="Tonnage Capacity"
                                                id="choose-tonnage-capacity"
                                                formControlProps={{
                                                    fullWidth: true
                                                }}
                                                options={props.tonnages}
                                                getLabel={(opt) => opt.tonnage}
                                                handleChange={(val) => {
                                                    // console.log(val.id)
                                                    if (val !== null)
                                                        setTonnage(val.tonnage)
                                                    else
                                                        setTonnage('')
                                                    console.log({ 'TotalTonnages': listDriveTrains(val.tonnage) })
                                                }} /> : <div></div>}
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={6}>
                                        <AutocompleteInput labelText="Drive Train"
                                            id="choose-drive-rain"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputValue={driveTrain}
                                            options={driveTrainList}
                                            getLabel={(opt) => opt}
                                            handleChange={(train) => {
                                                // console.log(val.id)
                                                if (train !== null) {
                                                    setDriveTrain(train)
                                                }
                                                else
                                                    setDriveTrain('')

                                            }} />
                                    </GridItem>
                                </GridContainer> : <div></div>}
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={4}>
                                    <SelectInput labelText="Gearbox"
                                        handleChange={(val) => {
                                            setGearbox(val)
                                        }}
                                        id="choose-gearbox"
                                        items={gearboxes}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${gearbox}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={6} sm={6} md={4}>
                                    <SelectInput labelText="Fuel"
                                        handleChange={(val) => {
                                            setFuel(val)
                                        }}
                                        // value={fuel}
                                        id="choose-fuel-type"
                                        items={fuelTypes}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${fuel}`
                                        }} />
                                </GridItem>
                                <GridItem xs={6} sm={6} md={4}>
                                    <CustomInput onChange={(val) => {
                                        setEngineCapacity(val);
                                    }}
                                        labelText="Engine Capacity"
                                        id="engine-capacity"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${engineCapacity}`,
                                            type: 'number',
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={3} sm={3} md={4}>
                                    <SelectInput labelText="Color"
                                        handleChange={(val) => {
                                            setColor(val)
                                        }}
                                        id="choose-color"
                                        items={listColors}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${color}`
                                        }} />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={4}>
                                    <SelectInput labelText="Interior Color"
                                        handleChange={(val) => {
                                            setInteriorColor(val)
                                        }}
                                        id="choose-interior-color"
                                        items={listColors}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${interiorColor}`
                                        }}
                                    />
                                </GridItem>
                                <GridItem xs={3} sm={3} md={4}>
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
                            <GridContainer>
                                <GridItem xs={6} sm={6} md={6}>
                                    <SelectInput labelText="Year"
                                        handleChange={(val) => {
                                            setYear(val)
                                        }}
                                        value={year}
                                        id="year"
                                        items={listYears}
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            value: `${year}`
                                        }} />
                                </GridItem>
                                <GridItem xs={6} sm={6} md={6}>
                                    <NumberPlateInput
                                        onChange={(val) => {
                                            setPlateNumber(val)
                                        }}
                                        // id="choose-car-plate"
                                        // formControlProps={{
                                        //     fullWidth: true,
                                        // }}
                                        inputProps={{
                                            value: `${plateNumber}`
                                        }} />
                                    {/* <CustomInput labelText="Plate"
                                        onChange={(val) => {
                                            setPlateNumber(val)
                                        }}
                                        id="choose-car-plate"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                        inputProps={{
                                            value: `${plateNumber}`
                                        }} /> */}
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={handleSaveCar}>Save</Button>
                            <ToastComponent />
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        success: state.drivers.isAdded,
        brands: state.brands.brands,
        tonnages: state.vehicles.tonnages,
        truckBodies: state.vehicles.truckBodies,
        vehicleTypes: state.vehicles.vehicleTypes
    };
}
export default connect(mapStateToProps)(RegisterDriverCar);