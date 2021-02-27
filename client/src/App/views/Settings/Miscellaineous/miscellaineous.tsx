import GridContainer from 'App/components/Grid/GridContainer'
import GridItem from 'App/components/Grid/GridItem'
import PageContainer from 'App/components/PageContainer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootStore } from '_store/store'
import { fetchCarTypes } from '_store/truck/actions'
import CarTypeCard from './components/car.type'

function MiscellaineousPage() {
    const dispatch = useDispatch()
    const listCarTypes = useSelector(
        (state: RootStore) => state.vehicles.vehicleTypes,
    )
    const [carType, setCarType] = useState<string>()
    const [driveTrain, setDriveTrain] = useState<string>()

    useEffect(() => {
        dispatch(fetchCarTypes())
    }, [])
    console.log({ 'cars': listCarTypes })
    return (
        <PageContainer>
            <GridContainer>
                {listCarTypes.map(type => {
                    if (type.name.toLocaleLowerCase() !== 'Truck'.toLocaleLowerCase())
                        return <GridItem xs={12} md={4} sm={12}>
                            <CarTypeCard key={type.id} carType={type} />
                        </GridItem>
                    else
                        return (<></>)
                })}
            </GridContainer>
        </PageContainer>
    )
}

export default MiscellaineousPage