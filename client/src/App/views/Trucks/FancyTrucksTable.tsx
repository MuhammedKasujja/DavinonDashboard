import React, { useCallback } from 'react'
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import EditIcon from "@material-ui/icons/Edit"
import { Link } from 'react-router-dom'
// import { addData, fetchCars } from 'App/redux/actions/carsActions'
import { Vehicle } from '_store/truck/types'
import { Column } from 'react-table'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'App/components/Table'
import { RootStore } from '_store/store'
import { FetchTrucks } from '_store/truck/actions'


const TrucksTable: React.FC<any> = () => {
  const vehiclesState = useSelector(
    (state: RootStore) => state.vehicles, 
  )
  const dispatch = useDispatch()
  const columns: Array<Column<Vehicle>> = React.useMemo(
    () => [
      {
        id: 'selection',
        Header: "#",
        width:35,
        // The cell can use the individual row's getToggleRowSelectedProps method
        // to the render a checkbox
        Cell: ({ row }) => {
          // console.log({ RowData: row.original })
          // creating a custom cell
          return (
            <Link to={{
              pathname: `/admin/trucks/edit/${row.original.model}`,
              // state: {
              //     driverId: props.driver.id
              // }
            }} onClick={() => {
              console.log("Yeah yes yes...........",row.original.model)

              //   props.dispatch(addLocalDriver(row.original))
            }}><EditIcon />
            </Link>
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
    ],
    []
  )

  React.useEffect(() => {
    dispatch(FetchTrucks())
  }, [])

  const handleAddTruck = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      console.log({'event':event})
    },
    []
  )

  return (
    <PageContainer>
      <PageToolbar
        title={`Cars`}
      />
      <Table<Vehicle>
        handleOnAdd={handleAddTruck}
        name='trucksTable'
        columns={columns}
        data={vehiclesState.vehicles}
      />
    </PageContainer>
  )
}

export default TrucksTable;