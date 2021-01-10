import React, { useEffect } from "react"
import { TableInstance } from "react-table"
import { useStyles } from "../TableStyles"
import SearchIcon from '@material-ui/icons/Search'
import ResetIcon from '@material-ui/icons/Close'
import IconButton from "@material-ui/core/IconButton"
import InputBase from "@material-ui/core/InputBase"


type GlobalFilter<T extends object = {}> = {
    instance: TableInstance<T>
}

export function GlobalFilter<T extends object>({
    instance,
}: GlobalFilter<T>) {
    const {
        preGlobalFilteredRows,
        setGlobalFilter,
        state: { globalFilter },
    } = instance
    const classes = useStyles()
    const count = preGlobalFilteredRows.length
    const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGlobalFilter(event.target.value)
    }
    // ensure that reset loads the new value
    useEffect(() => {
        setGlobalFilter(globalFilter || undefined) // Set undefined to remove the filter entirely
    }, [globalFilter,setGlobalFilter])

    // Global filter only works with pagination from the first page.
    // This may not be a problem for server side pagination when
    // only the current page is downloaded.

    return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
            <InputBase
                value={globalFilter || ''}
                onChange={handleFilter}
                // onChange={e => {
                //     setGlobalFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
                // }}
                placeholder={`${count} records...`}
                classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
            />
            {globalFilter != null ?
                <IconButton onClick={(e) => {
                    setGlobalFilter(undefined)
                }}>
                    <ResetIcon />
                </IconButton>
                : <div />}
        </div>
    )
}