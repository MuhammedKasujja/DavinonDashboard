import { IconButton, Tooltip, createStyles, makeStyles } from '@material-ui/core'
import BugReportTwoToneIcon from '@material-ui/icons/BugReportTwoTone'
import React, { useState } from 'react'

const useStyles = makeStyles(
  createStyles({
    button: {
      marginTop: -72,
      marginLeft: 0,
    },
  })
)

export const DumpInstance: React.FC<{
  enabled: boolean
  instance: any
}> = ({ enabled, instance }) => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  return enabled ? (
    <>
      <Tooltip title={'Debug'}>
        <span>
          <IconButton className={classes.button} onClick={() => setOpen((old) => !old)}>
            <BugReportTwoToneIcon />
          </IconButton>
        </span>
      </Tooltip>
      {open && (
        <>
          <br />
        </>
      )}
    </>
  ) : null
}
