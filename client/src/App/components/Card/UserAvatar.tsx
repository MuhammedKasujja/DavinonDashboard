import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

export interface UserAvatarProps {
    spacing?: number,
    imageUrl: string,
    name:string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
    }),
);

export default function UserAvatar(props: UserAvatarProps) {
    const { imageUrl, name } = props;
    const classes = useStyles();

    return (
        <Avatar alt={name} src={imageUrl} className={classes.avatar} />
    );
}
