import Divider from "@material-ui/core/Divider"
import ListItem from "@material-ui/core/ListItem"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import React, { ReactNode } from "react"

interface DetailListItemProps {
    label: string,
    value?: string | ReactNode
}

const DetailListItem = (props: DetailListItemProps) => {
    const { label, value } = props
    // if(value typeof ReactNode){

    // }
    return (<React.Fragment>
        <ListItem>
            <ListItemText>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    {label}
                </Typography>
            </ListItemText>
            <ListItemSecondaryAction>
                <Typography variant="h6" color="textSecondary" gutterBottom>
                    {value}
                </Typography>
            </ListItemSecondaryAction>
        </ListItem>
        <Divider variant="fullWidth" component="li" />
    </React.Fragment>
    )
}

export default DetailListItem