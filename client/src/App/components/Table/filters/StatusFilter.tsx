import { createStyles, makeStyles } from '@material-ui/core'
import React from 'react'
import { TableInstance } from 'react-table'

const useStyles = makeStyles(
    createStyles({
        columnsPopOver: {
            padding: 24,
        },
        filtersResetButton: {
            position: 'absolute',
            top: 18,
            right: 21,
        },
        popoverTitle: {
            fontWeight: 500,
            padding: '0 24px 24px 0',
            textTransform: 'uppercase',
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 218px)',
            '@media (max-width: 600px)': {
                gridTemplateColumns: 'repeat(1, 180px)',
            },
            gridColumnGap: 24,
            gridRowGap: 24,
        },
        cell: {
            width: '100%',
            display: 'inline-flex',
            flexDirection: 'column',
        },
        hidden: {
            display: 'none',
        },
    })
)


type StatusFilter<T extends object> = {
    instance: TableInstance<T>
}

export function StatusFilter<T extends object>({ instance }: StatusFilter<T>) {
    const classes = useStyles({})
    const {
        allColumns,
    } = instance

    return (
        <div className={classes.grid}>
            {allColumns
                .filter((it) => it.canFilter)
                .map((column) => {
                    console.log({ 'Filters': column.id })
                    if (column.id === 'status')
                        return (
                            <div key={column.id} className={classes.cell}>
                                {column.render('Filter')}
                            </div>
                        )
                    else
                        return (<></>)
                })}
        </div>
    )
}
