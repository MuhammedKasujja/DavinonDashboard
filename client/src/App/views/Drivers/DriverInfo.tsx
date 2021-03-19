import React from "react";
import { createStyles, makeStyles, StyleRules } from "@material-ui/core/styles";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { useDispatch, useSelector } from "react-redux"
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { addLocalDriver } from "../../redux/actions/driversActions";
import { isTableFiltered } from "../../redux/actions/tableActions";
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import { RootStore } from "_store/store";

const styles: StyleRules = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: 300,
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    personIcon: {
        '& svg': {
            fontSize: 100
        }
    }
};

const labels: { [index: string]: string } = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};

const useStyles = makeStyles(() => createStyles(styles))

const DriverInfo: React.FC<any> = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const driver = useSelector(
        (state: RootStore) => state.drivers.localDriver,
    )

    const [truck] = React.useState(driver && (driver.trucks && driver.trucks[0]))
    const [rating, setRating] = React.useState<number | null>(driver === undefined ? null : driver.charisma);
    const [hover, setHover] = React.useState(-1);
    const [] = React.useState(false);

    React.useEffect(() => {
        // console.log('component mounted')

        // return a function to execute at unmount {When removing the page}
        return () => {
            // console.log('component will unmount')
            // dispatch(addLocalDriver(null))
            // dispatch(isTableFiltered(false))
        }
    }, []) // notice the empty array
    return (
        <PageContainer>
            <PageToolbar
                title={`Drivers/${driver ? driver.name : ''}`}
            />
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                    <Card>
                        <CardBody>
                            <div style={{ height: 380 }}></div>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardBody>
                            <div style={{ height: 380 }}>
                                <CardAvatar>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={driver && driver.photo.url} alt="..." />
                                    </a>
                                </CardAvatar>
                                <Box component="fieldset" mb={3} borderColor="transparent">
                                </Box>
                                <h4 className={classes.cardTitle}>{driver != null ? driver.name : ''}</h4>
                                <h4 className={classes.cardTitle}>{truck ? `${truck.licencePlate}` : ''}</h4>
                            </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={6} >
                    <Card>
                        <div style={{ height: 350 }}></div>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={6} >
                    <Card>
                        <div style={{ height: 350 }}></div>
                    </Card>
                </GridItem>
            </GridContainer>

        </PageContainer>
    );
}

export default DriverInfo