import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { FilterProps, IdType, Row } from 'react-table'

function getMinMax<T extends object>(rows: Row<T>[], id: IdType<T>) {
    let min = rows.length ? rows[0].values[id] : 0
    let max = rows.length ? rows[0].values[id] : 0
    rows.forEach((row) => {
        min = Math.min(row.values[id], min)
        max = Math.max(row.values[id], max)
    })
    return [min, max]
}

export default function SliderColumnFilter<T extends object>({
    column: { render, filterValue, setFilter, preFilteredRows, id },
}: FilterProps<T>) {
    const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <TextField
                name={id}
                label={render('Header')}
                type='range'
                inputProps={{
                    min,
                    max,
                }}
                value={filterValue || min}
                onChange={(e) => {
                    setFilter(parseInt(e.target.value, 10))
                }}
            />
            <Button variant='outlined' style={{ width: 60, height: 36 }} onClick={() => setFilter(undefined)}>
                Off
        </Button>
        </div>
    )
}