import CircularProgress from "@material-ui/core/CircularProgress"
import MenuItem from "@material-ui/core/MenuItem"
import { createStyles, makeStyles, StyleRules } from "@material-ui/core/styles"
import AutocompleteInput from "App/components/CustomInput/AutocompleteInput"
import CustomInputText from "App/components/CustomInput/input"
import SelectInput from "App/components/CustomInput/SelectInput"
import GridContainer from "App/components/Grid/GridContainer"
import GridItem from "App/components/Grid/GridItem"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CarModel } from "_store/CarBrands/types"
import { RootStore } from "_store/store"
import { CarOption, Vehicle } from "_store/truck/types"

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

export interface TruckViewEditProps {
    vehicle: Vehicle,
    isEditting:boolean
}

const TruckViewEdit: React.FC<TruckViewEditProps> = (props) => {
    const { vehicle, isEditting } = props
    const store = useSelector(
        (state: RootStore) => state,
    )
    const dispatch = useDispatch()
    const classes = useStyles();
    const [make, setMake] = useState(vehicle.brand);
    const [model, setModel] = useState(vehicle.model);
    const [brandModels, setBrandModels] = useState<CarModel[]>([])
    const [carType, setCarType] = useState(vehicle.type)
    const [engineCapacity, setEngineCapacity] = useState(vehicle.tankCapacity);
    const [gearbox, setGearbox] = useState(vehicle.gearbox);
    const [fuel, setFuel] = useState(vehicle.fuel);
    const [seats, setSeats] = useState(vehicle.seats);
    const [cylinders, setCylinders] = useState(vehicle.cylinders);
    const [color, setColor] = useState(vehicle.color);
    const [interiorColor, setInteriorColor] = useState(vehicle.interior_color);
    const [year, setYear] = useState(vehicle.year);
    const [plateNumber, setPlateNumber] = useState(vehicle.licencePlate);
    const [driveTrainList, setDriveTrainList] = useState<string[]>([])
    const [driveTrain, setDriveTrain] = useState(vehicle.driveTrain);
    const [tonnage, setTonnage] = useState(vehicle.tonnage);
    const [truckBody, setTruckBody] = useState(vehicle.truckBody);
    const [driveTrainMenus, setDriveTrainMenus] = useState<any[]>([])
    const [carSeatsMenus, setCarSeatsMenus] = useState<any[]>([])
    const [driveTrainObjectsList, setDriveTrainObjectsList] = useState<CarOption[]>([])
    const [, setIsCarTypeTruck] = useState(Boolean)

    const listModels = (make: string) => {
        setBrandModels([])
        setModel('')
        store.brands.brands
            .map((brand) => {
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

    const listDriveTrains = (tonnage: string) => {
        setDriveTrainList([])
        setDriveTrain('')
        store.vehicles.tonnages
            .map((data) => {
                if (data.tonnage === tonnage) {
                    setDriveTrainList(data.drive_type)
                }
            })

    }
    const cars: any[] = []

    store.vehicles.vehicleTypes.forEach(element => {
        cars.push(<MenuItem key={element.name} value={element.name}>{element.name}</MenuItem>)
    })
    // setListCarType(cars)

    const onCarTypeSelected = (type: string) => {

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
        store.vehicles.vehicleTypes
            .map((data) => {
                // console.log({CarType:data.name, Options:data.types})
                if (data.name === type) {
                    var driveTrainTypes: any[] = [];
                    var listTrains: string[] = []
                    var driveTrainObectsList: CarOption[] = []
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
    const onCarDriveTrainSelected = (train: string) => {
        // Set vehicle drive train
        // setDriveTrainObjectsList([])
        setSeats('')
        // clearing the array
        //driveTrainMenus.length = 0
        driveTrainObjectsList.map((data) => {
            console.log(data)
            if (data.name === train) {
                var driveTrainTypes: any[] = [];

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
    useEffect(()=>{
        if(vehicle){
            listModels(vehicle.brand)
            onCarTypeSelected(vehicle.type)
            onCarDriveTrainSelected(vehicle.driveTrain)
        }
    })
    return (<>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                {store.brands.brands !== null ? <AutocompleteInput labelText="Brand"
                    id="choose-brand"
                    formControlProps={{
                        fullWidth: true,
                        
                    }}
                    inputProps={{
                        disabled: isEditting,
                    }}
                    // value={make}
                    options={store.brands.brands}
                    getLabel={(opt: any) => opt.make}
                    handleChange={(val: any) => {
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
                    inputProps={{
                        disabled: isEditting,
                    }}
                    value={model}
                    options={brandModels}
                    getLabel={(model: any) => model.name}
                    handleChange={(model: any) => {
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

        {store.vehicles.vehicleTypes !== null ? <GridContainer>
            <GridItem xs={6} sm={6} md={4}>
                <SelectInput labelText="Car Type"
                    handleChange={(val: string) => {
                        setCarType(val)
                        onCarTypeSelected(val);
                    }}
                    items={cars}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${carType}`,
                        disabled: isEditting,
                    }} />
            </GridItem>
            {carType !== 'Truck' ?
                <> <GridItem xs={12} sm={12} md={4}>
                    <SelectInput labelText="Drive Train"
                        handleChange={(val: string) => {
                            // setDriveTrain(val)
                            setDriveTrain(val)
                            onCarDriveTrainSelected(val)
                        }}
                        inputProps={{
                            disabled: isEditting,
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
                            handleChange={(val: string) => {
                                setSeats(val)
                            }}
                            id="choose-seats"
                            inputProps={{
                                disabled: isEditting,
                            }}
                            value={seats}
                            items={carSeatsMenus}
                            formControlProps={{
                                fullWidth: true
                            }} />
                    </GridItem></> : <GridItem xs={12} sm={12} md={8}>
                    {store.vehicles.truckBodies !== null ?
                        <AutocompleteInput labelText="Truck Body"
                            id="choose-truck-body"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                disabled: isEditting,
                            }}
                            options={store.vehicles.truckBodies}
                            getLabel={(opt: any) => opt.name}
                            handleChange={(val: any) => {
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
                    {store.vehicles.tonnages !== null ?
                        <AutocompleteInput labelText="Tonnage Capacity"
                            id="choose-tonnage-capacity"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                                disabled: isEditting,
                            }}
                            options={store.vehicles.tonnages}
                            getLabel={(opt: any) => opt.tonnage}
                            handleChange={(val: any) => {
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
                        inputProps={{
                            disabled: isEditting,
                        }}
                        inputValue={driveTrain}
                        options={driveTrainList}
                        getLabel={(opt: any) => opt}
                        handleChange={(train: any) => {
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
                    handleChange={(val: string) => {
                        setGearbox(val)
                    }}
                    id="choose-gearbox"
                    items={gearboxes}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${gearbox}`,
                        disabled: isEditting,
                    }}
                />
            </GridItem>
            <GridItem xs={6} sm={6} md={4}>
                <SelectInput labelText="Fuel"
                    handleChange={(val: string) => {
                        setFuel(val)
                    }}
                    // value={fuel}
                    id="choose-fuel-type"
                    items={fuelTypes}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${fuel}`,
                        disabled: isEditting,
                    }} />
            </GridItem>
            <GridItem xs={6} sm={6} md={4}>
                <CustomInputText handleChange={(val) => {
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
                        disabled: isEditting,
                    }}
                />
            </GridItem>
        </GridContainer>
        <GridContainer>
            <GridItem xs={3} sm={3} md={4}>
                <SelectInput labelText="Color"
                    handleChange={(val: string) => {
                        setColor(val)
                    }}
                    id="choose-color"
                    items={listColors}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${color}`,
                        disabled: isEditting,
                    }} />
            </GridItem>
            <GridItem xs={3} sm={3} md={4}>
                <SelectInput labelText="Interior Color"
                    handleChange={(val: string) => {
                        setInteriorColor(val)
                    }}
                    id="choose-interior-color"
                    items={listColors}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${interiorColor}`,
                        disabled: isEditting,
                    }}
                />
            </GridItem>
            <GridItem xs={3} sm={3} md={4}>
                <SelectInput labelText="Cylinders"
                    handleChange={(val: string) => {
                        setCylinders(val)
                    }}
                    id="choose-car-cylinders"
                    inputProps={{
                        disabled: isEditting,
                    }}
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
                    handleChange={(val: string) => {
                        setYear(val)
                    }}
                    value={year}
                    id="year"
                    items={listYears}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${year}`,
                        disabled: isEditting,
                    }} />
            </GridItem>
            <GridItem xs={6} sm={6} md={6}>
                <CustomInputText
                    handleChange={(val) => {
                        setPlateNumber(val)
                    }}
                    labelText="Licence Plate"
                    id="Licence-Plate"
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        value: `${plateNumber}`,
                        disabled: isEditting,
                    }} />
            </GridItem>
        </GridContainer>
    </>)
}

export default TruckViewEdit