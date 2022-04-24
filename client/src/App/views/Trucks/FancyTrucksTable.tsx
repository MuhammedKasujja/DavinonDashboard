import React, { useCallback } from 'react'
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { Link, useHistory } from 'react-router-dom'
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
  const history = useHistory()
  const columns: Array<Column<Vehicle>> = React.useMemo(
    () => [
      {
        Header: 'Brand',
        accessor: 'brand',
        Cell: ({ row }) => {
          return (
            <Link to={{
              pathname: `/admin/cars/edit/${row.original.id}`,
            }} onClick={() => {
              console.log("Yeah yes yes...........", row.original.model)
            }}> {row.original.brand}
            </Link>
          )
        }
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
        Header: 'Status',
        accessor: 'driverId',
        Cell: ({ value }: { value: Boolean }) => {
          var state: string = 'Available'
          if (value) {
            state = 'Taken'
          }
          return <>{state}</>
        }
      },
    ],
    []
  )

  React.useEffect(() => {
    dispatch(FetchTrucks())
  }, [])

  const handleAddTruck = useCallback(
    (_event: React.MouseEvent<Element, MouseEvent>) => {
      // console.log({'event':event})
      history.push('/admin/cars/new')
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