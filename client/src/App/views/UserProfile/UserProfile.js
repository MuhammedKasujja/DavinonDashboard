import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardAvatar from "../../components/Card/CardAvatar";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
import { connect } from "react-redux"
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import avatar from "../../assets/img/faces/muhammed.jpg";
import { addLocalDriver } from "../../redux/actions/driversActions";
import TrucksTable from "../Trucks/TrucksTable";
import { isTableFiltered } from "../../redux/actions/tableActions";
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"


const styles = {
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
    fontWeight: "300",
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

const labels = {
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

const useStyles = makeStyles(styles);

function UserProfile(props) {
  const classes = useStyles();
  const [driver, setDriver] = React.useState()
  const [truck, setTruck] = React.useState()
  const [rating, setRating] = React.useState(3);
  const [hover, setHover] = React.useState(-1);
  const [showAttachVehicle, setshowAttachVehicle] = React.useState(false);
  // const classes = useStyles();

  // const driver = drivers.filter((d)=>{
  //   return d.driverId === props.history.location.state.driverId
  // })

  React.useEffect(() => {
    // console.log('component mounted')
    //  console.log(props.trucks)
    // console.log({"DriverId":props.driver.id});
    //let truck = props.trucks.find(t => t.driverId === props.driver.id)

    setTruck(props.driver && props.driver.trucks[0])
    // console.log({ Truck: truck })
    setDriver(props.driver)

    // return a function to execute at unmount
    return () => {
      // console.log('component will unmount')
      props.dispatch(addLocalDriver(null))
      props.dispatch(isTableFiltered(false))
    }
  }, []) // notice the empty array
  return (
    <PageContainer>
      <PageToolbar
        title={`Drivers/${driver && driver.name}`}
      />
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Profile</h4>
              {/* <p className={classes.cardCategoryWhite}>Complete yo profile</p> */}
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.name : null}`
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Email address"
                    id="email-address"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.email : null}`
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Telephone"
                    id="telephone"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.telephone : null}`
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="City"
                    id="city"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.city : null}`
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Gender"
                    id="gender"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.gender : null}`
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="National ID"
                    id="national-id"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.nin : null}`
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Date of Birth"
                    id="dato-of-birth"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      disabled: true,
                      value: `${driver ? driver.birthday : null}`
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="transparent"></Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={driver && driver.photo.url} alt="..." />
              </a>
              {/* <IconButton className={classes.personIcon}>
                <PersonIcon />
              </IconButton> */}

            </CardAvatar>
            <CardBody profile>
              <Box component="fieldset" mb={3} borderColor="transparent">
                <div className={classes.root}>
                  <Rating size="large"
                    name="hover-feedback"
                    value={rating}
                    precision={0.5}
                    onChange={(_, newValue) => {
                      setRating(newValue);
                    }}
                    onChangeActive={(_, newHover) => {
                      setHover(newHover);
                    }}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                  {rating !== null && <Box ml={2}>{labels[hover !== -1 ? hover : rating]}</Box>}
                </div>
              </Box>
              <h4 className={classes.cardTitle}>{driver != null ? driver.name : ''}</h4>
              {(truck && truck !== undefined && truck.id !== null) ?
                <div className={classes.cardCategory}> {truck.brand}  {truck.model}  {truck.type}</div> :
                <Button color="primary" round onClick={() => {
                  setshowAttachVehicle(!showAttachVehicle)
                  props.dispatch(isTableFiltered(true))
                }}>
                  {!showAttachVehicle ? 'Attach A car' : 'Cancle'}

                </Button>}
              <h4 className={classes.cardTitle}>{truck ? `${truck.licencePlate}` : ''}</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              {truck ?
                <Button color="primary" round onClick={() => {
                  setTruck(null)
                }}>
                  Remove car
                </Button> : <div />}

            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      {showAttachVehicle ? <TrucksTable /> : <div />}

    </PageContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    driver: state.drivers.localDriver,
    trucks: state.vehicles.trucks
  };
}
export default connect(mapStateToProps)(UserProfile);