import { MenuItem, TextField } from '@material-ui/core'
import React from 'react'
import { FilterProps } from 'react-table'

export default function DropdownColumnFilter<T extends object>({
    column: { filterValue, render, setFilter, preFilteredRows, id },
  }: FilterProps<T>) {
    const options = React.useMemo(() => {
      const options = new Set<any>()
      preFilteredRows.forEach((row) => {
        options.add(row.values[id])
      })
      return [...Array.from(options.values())]
    }, [id, preFilteredRows])
  
    return (
      <TextField
        select
        label={render('Header')}
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined)
        }}
      >
        <MenuItem value={''}>All</MenuItem>
        {options.map((option, i) => (
          <MenuItem key={i} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    )
  }