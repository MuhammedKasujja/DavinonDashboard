import React, { useCallback } from 'react'

import { useDispatch, useSelector } from "react-redux"
import Chip from "@material-ui/core/Chip"

import { RootStore } from '_store/store'
import { Column } from 'react-table'
import { Table } from 'App/components/Table'
import PageContainer from 'App/components/PageContainer'
import User from '_types/User'
import { fetchUsers } from '_store/Users/actions'
import { useHistory } from 'react-router-dom'


const UsersTable: React.FC<any> = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const usersState = useSelector(
        (state: RootStore) => state.auth,
    )
    const columns: Array<Column<User>> =
        //  React.useMemo(
        //     () => 
        [
            {
                Header: 'Username',
                accessor: 'username',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'Role',
                accessor: 'role',
            },
            {
                Header: 'Enabled',
                Cell: ({ value }: { value: boolean }) => {
                    var status = 'Disabled';
                    if (value === true) {
                        status = 'Enabled'
                    }
                    return (
                        <>{status}</>
                    )
                },
                accessor: 'enabled',
            },
            {
                Header: 'Last Active',
                accessor: 'lastLogin',
            },
            {
                Header: 'Actions',
                Cell: ({ value }: { value: string }) => {
                    return (
                        <Chip color='primary' style={{ backgroundColor: 'grey' }} label='Edit' />
                    )
                },
                accessor: 'userId',
            },
        ]
    // []
    // )
    const handleAddUser = useCallback(
        (event: React.MouseEvent<Element, MouseEvent>) => {
          console.log({ 'event': event })
        //   history.push('/')
        },
        []
      )

    React.useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    return (
        <PageContainer>
            <Table<User>
                handleOnAdd={handleAddUser}
                name={'usersTable'}
                columns={columns} data={usersState.users}></Table>
        </PageContainer>
    )
}

export default UsersTable