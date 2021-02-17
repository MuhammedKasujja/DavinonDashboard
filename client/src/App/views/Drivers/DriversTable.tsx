import React, { useCallback } from 'react'
import { useDispatch, useSelector } from "react-redux"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import EditIcon from "@material-ui/icons/Edit"
import { Link, useHistory } from 'react-router-dom'
import { addData } from 'App/redux/actions/carsActions'
import { GetDrivers, AddLocalDriver } from "../../../_store/driver/actions"
import Chip from "@material-ui/core/Chip"
import { Driver } from '_store/driver/types'
import { RootStore } from '_store/store'
import { Table } from 'App/components/Table'
import { Column } from 'react-table'

const getAge = (dateOfBirth: string) => {
  if (dateOfBirth) {
    const dob = new Date(dateOfBirth)
    let yearNow = new Date().getFullYear();
    let monthNow = new Date().getMonth() + 1;
    let dayNow = new Date().getDate();
    if ((monthNow === dob.getMonth() && dayNow < dob.getDate()) || monthNow < dob.getMonth()) {
      return `${yearNow - dob.getFullYear() - 1}`;
    } else {
      return `${yearNow - dob.getFullYear()}`;
    }
  } else {
    return '_'
  }

}

const DriversTable: React.FC<any> = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const driversState = useSelector(
    (state: RootStore) => state.drivers,
  )


  const _onAdd = (event: MouseEvent) => {

  }
  const columns: Array<Column<Driver>> =
    React.useMemo(
      () =>
        [
          {
            id: 'selection',
            Header: "#",
            width: 35,
            // The cell can use the individual row's getToggleRowSelectedProps method
            // to the render a checkbox
            Cell: ({ row }) => {
              // console.log({ RowData: row.original })
              return (
                <Link to={{
                  pathname: `/admin/drivers/edit/${row.original.name}`,
                  // state: {
                  //     driverId: props.driver.id
                  // }
                }} onClick={() => {
                  console.log("Yeah yes yes...........")
                  dispatch(AddLocalDriver(row.original))
                }}><EditIcon />
                </Link>
              )
            },
            accessor: 'id',
          },
          {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ value }: { value: string }) => (
              <>
                <span role="img" aria-label="mage">
                  🧙
            </span>
                {value}
              </>
            ),
          },

          {
            Header: 'Contact',
            accessor: 'telephone',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          // {
          //   label: 'gender',
          //   name: 'status',
          // },
          {
            Header: 'Rating',
            accessor: `charisma`,
          },
          {
            Header: 'Active',
            Cell: ({ value }: { value: Boolean }) => {
              // console.log({ RowData: row.original })
              // creating a custom cell
              var lableColor = 'grey'
              var status = 'offline'
              if (value) {
                status = 'online'
                lableColor = '#d4a248'
              }
              return (
                <Chip key={status} color='primary' style={{ backgroundColor: lableColor }} label={status} />
              )
            },
            accessor: 'status',
          },
          // {
          //   Header: 'Status',
          //   Cell: ({ value }: { value: boolean }) => {
          //     // console.log({ RowData: row.original })
          //     // creating a custom cell
          //     var lableColor = 'grey'
          //     var status = 'offline'
          //     if (value) {
          //       status = 'online'
          //       lableColor = 'blue'
          //     }
          //     return (
          //       <Chip key={status} color='primary' style={{ backgroundColor: lableColor }} label={status} />
          //     )
          //   },
          //   accessor: 'status',
          // },

        ],
      []
    )

  React.useEffect(() => {
    dispatch(GetDrivers())
  }, [])

  const saveData = () => {
    dispatch(addData());
  }

  const handleAddDriver = useCallback(
    (event: React.MouseEvent<Element, MouseEvent>) => {
      console.log({'event':event}) 
      history.push('/admin/drivers/new') 
    },
    []
  )
  return (
    <PageContainer>
      <PageToolbar
        title={`Drivers`}
      />
      <Table<Driver>
        handleOnAdd={handleAddDriver}
        name={'driversTable'}
        columns={columns} data={driversState.drivers} />
    </PageContainer>
  )
}

export default DriversTable