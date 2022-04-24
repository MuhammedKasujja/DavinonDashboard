import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
});
interface CardImageProps {
    url: string,
    imgHeight: number,
    alt: string
}

const CardImage: React.FC<CardImageProps> = (props) => {
    const { url, imgHeight, alt } = props
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={alt}
                    height={imgHeight}
                    image={url}
                    title={alt}
                />
                {/* <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
          </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
          </Typography>
                </CardContent> */}
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Edit
                </Button>
                <Button size="small" color="primary">
                    Remove
                </Button>
                <Button size="small" color="primary">
                    Attach Driver
                </Button>
            </CardActions>
        </Card>
    );
}

export default CardImage
