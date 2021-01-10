import { InputLabel, TextField } from '@material-ui/core'
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

const useActiveElement = () => {
    const [active, setActive] = React.useState(document.activeElement)

    const handleFocusIn = () => {
        setActive(document.activeElement)
    }

    React.useEffect(() => {
        document.addEventListener('focusin', handleFocusIn)
        return () => {
            document.removeEventListener('focusin', handleFocusIn)
        }
    }, [])

    return active
}

export default function NumberRangeColumnFilter<T extends object>({
    column: { filterValue = [], render, preFilteredRows, setFilter, id },
}: FilterProps<T>) {
    const [min, max] = React.useMemo(() => getMinMax(preFilteredRows, id), [id, preFilteredRows])
    const focusedElement = useActiveElement()
    const hasFocus = focusedElement && (focusedElement.id === `${id}_1` || focusedElement.id === `${id}_2`)
    return (
        <>
            <InputLabel htmlFor={id} shrink focused={!!hasFocus}>
                {render('Header')}
            </InputLabel>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 5 }}>
                <TextField
                    id={`${id}_1`}
                    value={filterValue[0] || ''}
                    type='number'
                    onChange={(e) => {
                        const val = e.target.value
                        setFilter((old: any[] = []) => [val ? parseInt(val, 10) : undefined, old[1]])
                    }}
                    placeholder={`Min (${min})`}
                    style={{
                        width: '70px',
                        marginRight: '0.5rem',
                    }}
                />
          to
          <TextField
                    id={`${id}_2`}
                    value={filterValue[1] || ''}
                    type='number'
                    onChange={(e) => {
                        const val = e.target.value
                        setFilter((old: any[] = []) => [old[0], val ? parseInt(val, 10) : undefined])
                    }}
                    placeholder={`Max (${max})`}
                    style={{
                        width: '70px',
                        marginLeft: '0.5rem',
                    }}
                />
            </div>
        </>
    )
}