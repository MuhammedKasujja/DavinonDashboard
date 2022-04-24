import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/Camera'

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    cameraIcon: {
        // position: "fixed", transform: "translate(-50%, -50%)",
        // top: '50%', left: '50%', 
    },
    box: {
        height: 100,
        width:345,
        display: "flex",
        border: "1px solid black",
        padding: 8
    },
    centerBox: {
        justifyContent: "center",
        alignItems: "center"
    }
});

export interface ImageProps {
    file?: File,
    handleChangePhoto: (file: File | undefined) => void
}

export function AttackPhoto(props: ImageProps) {
    const [selectedImage, setSelectedImage] = React.useState<File>()
    const inputFile = React.createRef<HTMLInputElement>()
    const handleOpenFile = () => {
        if (inputFile.current) {
            const node = inputFile.current
            node.click();
        }
    }
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log("Getting files")
        if (event.currentTarget) {
            if (event.currentTarget.files && event.currentTarget.files[0]) {
                console.log(event.currentTarget.files[0])
                let reader = new FileReader();
                let file = event.currentTarget.files[0];
                setSelectedImage(file)
                // console.log({ 'FileName': file.name })
                reader.onloadend = () => {
                    // setImageUrl(reader.result)
                };
                reader.readAsDataURL(file);
                props.handleChangePhoto(file)
            }
        }
    };
    const classes = useStyles();

    const photoContainer = () => {
        // if (selectedImage)
        return <CardMedia
            component="img"
            alt={selectedImage && selectedImage.name}
            height="300"
            image={selectedImage && URL.createObjectURL(selectedImage)}
            onClick={handleOpenFile}
        />
        // else
        //     return <CardContent>
        //         <div style={{ height: '300', width: '345' }} onClick={handleOpenFile} >
        //             <AttachFileIcon />
        //         </div>
        //     </CardContent>
    }
    const icon = selectedImage === undefined ? <CameraIcon className={classes.cameraIcon} /> : <div />;
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={selectedImage && selectedImage.name}
                    height="300"
                    image={selectedImage && URL.createObjectURL(selectedImage)}
                    onClick={handleOpenFile}
                />
                <CardContent>
                    <input type="file" accept="image/*" id="file" ref={inputFile}
                        style={{ display: "none" }} onChange={onChange} />
                    {icon}
                </CardContent>
            </CardActionArea>
            {selectedImage &&
                <CardActions>
                    <Button size="small" color="primary">
                        Change
                </Button>
                    <Button size="small" color="primary" onClick={() => {
                        setSelectedImage(undefined)
                        props.handleChangePhoto(undefined)
                    }}>
                        Remove
                </Button>
                </CardActions>
            }
        </Card>
    );
}
