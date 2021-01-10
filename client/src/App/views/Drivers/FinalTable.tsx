import React, { useCallback, useState } from 'react';
import {
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Checkbox,
    Grid,
    TextField,
    Button,
} from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import { useTable, RowType, ColumnType } from 'react-final-table';

export interface FancyTableProps<T> {
    columns: ColumnType<T>[],
    data: T[]
}

function FinalTable<T>({ columns, data }: FancyTableProps<T>) {
    const [searchString, setSearchString] = useState('');

    const {
        headers,
        rows,
        selectRow,
        selectedRows,
        originalRows,
        toggleSort,
        toggleAll,
        pagination
    } = useTable<T>(columns, data, {
        pagination: true,
        selectable: true,
        filter: useCallback(
            (rows: RowType<T>[]) => {
                return rows.filter(row => {
                    return (
                        row.cells.filter(cell => {
                            // if (cell.value.toLowerCase().includes(searchString)) {
                            //     return true;
                            // }

                            if (cell.value != null && cell.value.toLowerCase().includes(searchString)) {
                                return true;
                            }

                            return false;
                        }).length > 0
                    );
                });
            },
            [searchString]
        ),
    });

    return (
        <Grid container>
            <Grid item>
                <TextField
                    variant="outlined"
                    label="Search..."
                    value={searchString}
                    onChange={e => setSearchString(e.target.value)}
                />
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <Checkbox
                                        indeterminate={
                                            selectedRows.length > 0 &&
                                            selectedRows.length !== rows.length
                                        }
                                        checked={selectedRows.length === rows.length}
                                        onClick={() => toggleAll()}
                                    />
                                </TableCell>
                                {headers.map(column => (
                                    <TableCell onClick={() => toggleSort(column.name)}>
                                        {column.render()}{' '}
                                        {column.sorted.on ? (
                                            <>
                                                {column.sorted.asc ? (
                                                    <ArrowUpward />
                                                ) : (
                                                        <ArrowDownward />
                                                    )}
                                            </>
                                        ) : null}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow>
                                    <TableCell>
                                        <Checkbox
                                            checked={row.selected}
                                            onChange={() => selectRow(row.id)}
                                        />
                                    </TableCell>
                                    {row.cells.map(cell => (
                                        <TableCell>{cell.render()}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{paddingTop:'20px'}}>
                    <button data-testid="page-total">
                        {data.length}
                    </button>
                    <button data-testid="prev-page" onClick={() => pagination.prevPage()}>
                        {'<'}
                    </button>
                    <button data-testid="next-page" onClick={() => pagination.nextPage()}>
                        {'>'}
                    </button>
                </div>
            </Grid>
        </Grid>
    );
}

export default FinalTable;