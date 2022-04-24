import SnackbarAlert from 'App/components/Alerts/SnackbarAlert'
import Card from 'App/components/Card/Card'
import CardFooter from 'App/components/Card/CardFooter'
import CardImage from 'App/components/Card/CardImage'
import TSButton from 'App/components/CustomButtons/TSButton'
import GridContainer from 'App/components/Grid/GridContainer'
import GridItem from 'App/components/Grid/GridItem'
import CircularProgressIndicator from 'App/components/LoadingIcons/CircularLoading'
import PageContainer from 'App/components/PageContainer'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { RootStore } from '_store/store'
import { clearError, deleteVehicle, fetchVehicleDetails } from '_store/truck/actions'
import { Vehicle } from '_store/truck/types'
import TruckViewEdit from './TruckViewEdit'

const TruckDetails: React.FC<any> = () => {
    const [vehicle, setVehicle] = useState<Vehicle>()
    const [isViewMode, setIsViewMode] = useState(true)
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams<{ id: string }>();
    const [hasResponse, setHasResponse] = useState(false)

    const vehiclesState = useSelector(
        (state: RootStore) => state.vehicles,
    )

    React.useEffect(() => {
        setVehicle(undefined)
        dispatch(clearError())
        dispatch(fetchVehicleDetails(params.id))
    }, [])

    React.useEffect(() => {
        return () => {
            dispatch(clearError())
        }
    }, [])

    React.useEffect(() => {
        if (vehiclesState.localVehicle) {
            setVehicle(vehiclesState.localVehicle)
            // console.log(vehiclesState.localVehicle)
        }
        if (vehiclesState.success) {
            setHasResponse(true)
            console.log(vehiclesState.success)
            history.replace('/admin/cars')
        }
    }, [vehiclesState.error, vehiclesState.isLoading, vehiclesState.localVehicle, vehiclesState.success])

    const handleDeleteCar = (e: any) => {
        e.preventDefault()
        dispatch(deleteVehicle(params.id))
    }



    return (<>{vehicle
        ? (<PageContainer>
            <SnackbarAlert isOpen={hasResponse} message={vehiclesState.success} onClose={() => {

            }} />
            <Card>
                <div style={{ padding: '8px' }}>
                    <GridContainer>
                        <GridItem md={5} xs={12} lg={5}>
                            {/* <CardImage url={vehicle.photo.url} imgHeight={350} alt={vehicle.model} /> */}
                            <Card>
                                <div style={{ height: "380px" }}>
                                    <img src={vehicle.photo.url} style={{ maxHeight: "380px", width: "100%" }} />
                                </div>
                                <CardFooter>
                                    <TSButton onClick={() => {
                                        setIsViewMode(!isViewMode)
                                    }}>Edit</TSButton>
                                    <TSButton onClick={handleDeleteCar} disabled={vehiclesState.isLoading}>
                                        {vehiclesState.isLoading &&
                                            <CircularProgressIndicator />}
                                        <p style={{ margin: '2px' }}>Remove</p></TSButton>
                                    {vehicle.driverId ? <TSButton>Remove Driver</TSButton> : <TSButton>Attach Driver</TSButton>}
                                </CardFooter>
                            </Card>
                        </GridItem>
                        <GridItem md={7} xs={12} lg={7}>
                            <Card>
                                <div style={{ padding: '8px' }}>
                                    <TruckViewEdit vehicle={vehicle} isEditting={isViewMode} />
                                    {/* <p>{vehicle.brand} {vehicle.model} {vehicle.year}</p>
                            <p>{vehicle.color} / {vehicle.interior_color && vehicle.interior_color}</p>
                            <p>{vehicle.licencePlate}</p>
                            <p>{vehicle.driveTrain}</p>
                            <p>{vehicle.fuel}</p>
                            <p>{vehicle.tonnage && vehicle.tonnage}</p>
                            <p>{vehicle.truckBody && vehicle.truckBody}</p>
                            <p>{vehicle.tankCapacity && vehicle.tankCapacity}</p>
                            <p>{vehicle.cylinders && vehicle.cylinders}</p> */}
                                </div>
                                <CardFooter></CardFooter>
                            </Card>
                        </GridItem>
                    </GridContainer>
                    <GridContainer>
                        <TruckImage url={vehicle.photo.url} />
                        <TruckImage url='' />
                        <TruckImage url='' />
                        <TruckImage url='' />
                    </GridContainer>
                </div>
            </Card>
        </PageContainer>) : <p>Loading.....</p>}</>)
}

interface TruckImageUrl {
    url: string
}

const TruckImage: React.FC<TruckImageUrl> = (props) => {
    const { url } = props
    return (<GridItem md={3} xs={12} lg={3}>
        <Card>
            <div style={{ height: "380px" }}>
                <img src={url} style={{ maxHeight: "380px", width: "100%" }} />
            </div>
        </Card>
    </GridItem>)
}

export default TruckDetails