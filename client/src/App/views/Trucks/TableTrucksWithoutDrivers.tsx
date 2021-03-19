import React, { forwardRef, Ref, useEffect, useImperativeHandle, useState } from 'react'
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { useHistory } from 'react-router-dom'
// import { addData, fetchCars } from 'App/redux/actions/carsActions'
import { Vehicle } from '_store/truck/types'
import { Column } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'App/components/Table'
import { RootStore } from '_store/store'
import { FetchTrucks } from '_store/truck/actions'
import Typography from '@material-ui/core/Typography'
import Radio from '@material-ui/core/Radio';
import { attachVehicleToDriver } from '_store/driver/actions'

export interface TableTrucksWithoutDriversProps {
    onSave: () => void
}

// Create a child which can be triggered from the parent
const TableTrucksWithoutDrivers = forwardRef((props: {}, ref: Ref<TableTrucksWithoutDriversProps>) => {
    const driver = useSelector(
        (state: RootStore) => state.drivers.localDriver,
    )
    useImperativeHandle(ref, () => ({ onSave }));
    const [selectedVehicle, setSelectedVehicle] = useState('')
    const vehiclesState = useSelector(
        (state: RootStore) => state.vehicles,
    )
    const dispatch = useDispatch()
    const history = useHistory()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVehicle(event.target.value);
        console.error({ id: event.target.value })
    };
    const onSave = () => {
        console.log('I love this please.....')
        if (selectedVehicle) {
            if (driver && driver.id)
                dispatch(attachVehicleToDriver(selectedVehicle, driver.id))
        }
    }

    useEffect(() => {
        setSelectedVehicle(selectedVehicle);
    }, [selectedVehicle])

    const columns: Array<Column<Vehicle>> = React.useMemo(
        () => [
            {
                id: 'selection',
                Header: "#",
                width: 35,
                Cell: ({ row }) => {
                    return (
                        <Typography >
                            {row.index + 1}
                        </Typography>
                    )
                },
                accessor: 'id',
            },
            {
                Header: 'Brand',
                accessor: 'brand',
            },

            {
                Header: 'Model',
                accessor: 'model',
            },
            {
                Header: 'Type',
                accessor: 'type',
            },
            {
                Header: 'Color',
                accessor: 'color',
            },
            {
                Header: 'Licence Plate',
                accessor: `licencePlate`,
            },
            {
                Header: 'Gearbox',
                accessor: 'gearbox',
            },
            {
                Header: 'Engine',
                accessor: 'fuel',
            },
            {
                Header: "Select",
                Cell: ({ row }) => {
                    return (
                        <Radio
                            checked={selectedVehicle === row.original.id}
                            onChange={handleChange}
                            value={row.original.id}
                            name="radio-button-demo"
                        // inputProps={{ 'aria-label': 'A' }}
                        />
                    )
                },
                accessor: 'year',
            },
        ],
        []
    )

    React.useEffect(() => {
        dispatch(FetchTrucks())
    }, [])

    const vehicles = vehiclesState.vehicles.filter(vehicle => (vehicle.driverId === null || vehicle.driverId === ''))
    return (
        <PageContainer>
            {/* <PageToolbar
                title={`Cars`}
            /> */}
            <Table<Vehicle>
                name='trucksTableWithoutDrivers'
                columns={columns}
                data={vehicles}
            />
        </PageContainer>
    )
})

export default TableTrucksWithoutDrivers;