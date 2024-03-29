import React from 'react'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'

interface PageLinks {
  name: string,
  url: string
}

interface PageBreadcrumbsProps {
  isCurrentPage: boolean,
  links: PageLinks[]
}

const PageBreadcrumbs = (props: PageBreadcrumbsProps) => {
  const { isCurrentPage, links } = props
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/">
        Material-UI
      </Link>
      <Link color="inherit" href="/getting-started/installation/">
        Core
      </Link>
      <Typography color="textPrimary">Breadcrumb</Typography>
    </Breadcrumbs>
  )
}

export default PageBreadcrumbs
