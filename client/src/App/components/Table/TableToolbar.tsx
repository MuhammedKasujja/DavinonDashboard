import { Button, IconButton, Theme, Toolbar, Tooltip, createStyles, makeStyles } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CreateIcon from '@material-ui/icons/CreateOutlined'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import FilterListIcon from '@material-ui/icons/FilterList'
import ViewColumnsIcon from '@material-ui/icons/ViewColumn'
import DownloadIcon from "@material-ui/icons/FontDownload"
import classnames from 'classnames'
import React, { MouseEvent, MouseEventHandler, PropsWithChildren, ReactElement, useCallback, useState } from 'react'
import { Row, TableInstance } from 'react-table'
import { TableMouseEventHandler } from 'types/react-table-config'

import { ColumnHidePage } from './ColumnHidePage'
import { FilterPage } from './FilterPage'
import { GlobalFilter } from './filters'
import { CSVLink, CSVDownload } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    leftButtons: {},
    rightButtons: {},
    leftIcons: {
      '&:first-of-type': {
        marginLeft: -12,
      },
    },
    rightIcons: {
      padding: 12,
      marginTop: '-6px',
      width: 48,
      height: 48,
      '&:last-of-type': {
        marginRight: -12,
      },
    },
  })
)

type InstanceActionButton<T extends object> = {
  instance: TableInstance<T>
  icon?: JSX.Element
  onClick: TableMouseEventHandler
  enabled?: (instance: TableInstance<T>) => boolean
  label: string
  variant?: 'right' | 'left'
}

type ActionButton<T extends object> = {
  icon?: JSX.Element
  onClick: MouseEventHandler
  enabled?: boolean
  label: string
  variant?: 'right' | 'left'
}

export const InstanceLabeledActionButton = <T extends object>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
}: InstanceActionButton<T>): ReactElement => {
  return (
    <Button variant='contained' color='primary' onClick={onClick(instance)} disabled={!enabled(instance)}>
      {icon}
      {label}
    </Button>
  )
}

export const LabeledActionButton = <T extends object>({
  icon,
  onClick,
  label,
  enabled = true,
}: ActionButton<T>): ReactElement => {
  return (
    <Button variant='contained' color='secondary' onClick={onClick} disabled={!enabled}>
      {icon}
      {label}
    </Button>
  )
}

export const InstanceSmallIconActionButton = <T extends object>({
  instance,
  icon,
  onClick,
  label,
  enabled = () => true,
  variant,
}: InstanceActionButton<T>) => {
  const classes = useStyles({})
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({ [classes.rightIcons]: variant === 'right', [classes.leftIcons]: variant === 'left' })}
          onClick={onClick(instance)}
          disabled={!enabled(instance)}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export const SmallIconActionButton = <T extends object>({
  icon,
  onClick,
  label,
  enabled = true,
  variant,
}: ActionButton<T>) => {
  const classes = useStyles({})
  return (
    <Tooltip title={label} aria-label={label}>
      <span>
        <IconButton
          className={classnames({ [classes.rightIcons]: variant === 'right', [classes.leftIcons]: variant === 'left' })}
          onClick={onClick}
          disabled={!enabled}
        >
          {icon}
        </IconButton>
      </span>
    </Tooltip>
  )
}

type TableToolbar<T extends object> = {
  instance: TableInstance<T>
  onAdd?: TableMouseEventHandler
  onDelete?: TableMouseEventHandler
  onEdit?: TableMouseEventHandler
  handleOnAdd?: MouseEventHandler
}

export function TableToolbar<T extends object>({
  instance,
  onAdd,
  onDelete,
  onEdit,
  handleOnAdd
}: PropsWithChildren<TableToolbar<T>>): ReactElement | null {
  const { columns } = instance
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState<Element | undefined>(undefined)
  const [columnsOpen, setColumnsOpen] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const hideableColumns = columns.filter((column) => !(column.id === '_selector'))
  const [csvData, setCsvData] = useState<Data>([])

  const handleColumnsClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setColumnsOpen(true)
    },
    [setAnchorEl, setColumnsOpen]
  )

  const handleFilterClick = useCallback(
    (event: MouseEvent) => {
      setAnchorEl(event.currentTarget)
      setFilterOpen(true)
    },
    [setAnchorEl, setFilterOpen]
  )

  const handleClose = useCallback(() => {
    setColumnsOpen(false)
    setFilterOpen(false)
    setAnchorEl(undefined)
  }, [])

  const dataToDownload = (data: Row<T>[],) =>
    data.map(record =>
      columns.reduce((recordToDownload, column) => {
        var colHeader = column.Header;
        // var value = record[column.];
        // recordToDownload[colHeader] = record[column.accessor];
        return recordToDownload;
      }, {})

    );

  const downloadToCSV = (event: any) => {
    // instance.rows.
    const currentRecords = instance.rows;
    var data_to_download = []
    for (var index = 0; index < currentRecords.length; index++) {
      var row = currentRecords[index].original
      data_to_download.push(currentRecords[index].original)
    }
    setCsvData(data_to_download)

    console.log({ DataRecords: data_to_download })
  }

  // toolbar with add, edit, delete, filter/search column select.
  return (
    <Toolbar className={classes.toolbar}>
      <div className={classes.leftButtons}>
        <GlobalFilter<T> instance={instance} />
        {onAdd && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<AddIcon />}
            onClick={onAdd}
            label='Add'
            enabled={({ state }: TableInstance<T>) =>
              !state.selectedRowIds || Object.keys(state.selectedRowIds).length === 0
            }
            variant='left'
          />
        )}
        {onEdit && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<CreateIcon />}
            onClick={onEdit}
            label='Edit'
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds && Object.keys(state.selectedRowIds).length === 1
            }
            variant='left'
          />
        )}
        {onDelete && (
          <InstanceSmallIconActionButton<T>
            instance={instance}
            icon={<DeleteIcon />}
            onClick={onDelete}
            label='Delete'
            enabled={({ state }: TableInstance<T>) =>
              state.selectedRowIds && Object.keys(state.selectedRowIds).length > 0
            }
            variant='left'
          />
        )}
        {/* <button onClick={downloadToCSV}>Download</button>
        <CSVLink data={csvData} >Download me</CSVLink> */}
        {/* <LabeledActionButton<T>
          icon={<DownloadIcon />}
          onClick={downloadToCSV}
          label='CSV'
          variant='left'
        /> */}
      </div>
      <div className={classes.rightButtons}>
        {/* <GlobalFilter<T> instance={instance} /> */}
        <ColumnHidePage<T> instance={instance} onClose={handleClose} show={columnsOpen} anchorEl={anchorEl} />
        <FilterPage<T> instance={instance} onClose={handleClose} show={filterOpen} anchorEl={anchorEl} />
        {handleOnAdd && <LabeledActionButton<T>
          icon={<AddIcon />}
          onClick={handleOnAdd}
          label='New'
          variant='right'
        />}

        {/* {hideableColumns.length > 1 && (
          <SmallIconActionButton<T>
            icon={<ViewColumnsIcon />}
            onClick={handleColumnsClick}
            label='Show / hide columns'
            variant='right'
          />
        )} */}
        <SmallIconActionButton<T>
          icon={<FilterListIcon />}
          onClick={handleFilterClick}
          label='Filter by columns'
          variant='right'
        />
      </div>
    </Toolbar>
  )
}
