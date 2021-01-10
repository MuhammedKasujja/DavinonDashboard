import React from "react"
// import Table from '../../components/Table/Table'
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from 'react-router-dom'
import Edit from "@material-ui/icons/Edit"
import { fetchCars } from "../../redux/actions/carsActions"
import { connect } from "react-redux"
import Button from "../../components/CustomButtons/Button"
import { attachVehicleToDriver } from "../../redux/actions/driversActions";
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"

const useStyles = makeStyles(styles);

class TrucksTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trucks: [] }
        this.state.onAttachVehicleToDriver = this.onAttachVehicleToDriver.bind(this)
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCars());
    }

    onAttachVehicleToDriver = (truckId) => {
        // console.log(truckId)
        this.props.dispatch(attachVehicleToDriver(truckId, this.props.driver.id))
    }

    trucksList() {
        var trucks = [];
        if (this.props.tableFiltered) {
            trucks = this.props.trucks.filter((t) => {
                return (t.driverId === null || t.driverId === undefined || t.driverId === '')
            })
        }
        else {
            trucks = this.props.trucks
        }
        return trucks.map((currentTrucks, i) => {
            // console.log({ "currentDriver": currentDriver.id })
            return <TruckRow truck={currentTrucks} key={currentTrucks.id} index={i + 1} isFiltered={this.props.tableFiltered}
                onAttachVehicle={this.state.onAttachVehicleToDriver} />
        })

    }

    render() {
        return (
            <PageContainer>
                 <PageToolbar
                    title={`Cars`}
                />
                {/* <Table
                    tableHeaderColor="primary"
                    tableHead={["#", "Brand", "Model", "Type", "Seats", "Plate", 'Engine', "Color"]}
                    tableData={this.trucksList()}
                /> */}
            </PageContainer>
        );
    }
}

const TruckRow = (props) => {
    const classes = useStyles();
    return (
        <TableRow className={classes.tableBodyRow}>
            <TableCell>
                {props.isFiltered === true ? <Button color="primary" round onClick={() => {
                    props.onAttachVehicle(props.truck.id)
                }}>
                    Add to Driver
                </Button> : <Link to={{
                        pathname: `/admin/truck/edit/${props.truck.model}${props.truck.licencePlate}`,
                    }}><Edit />
                    </Link>}

            </TableCell>
            <TableCell className={classes.tableCell} >
                {props.truck.brand}
            </TableCell>
            <TableCell className={classes.tableCell}>{props.truck.model}</TableCell>
            <TableCell className={classes.tableCell}>{props.truck.type}</TableCell>
            <TableCell className={classes.tableCell}>{props.truck.seats}</TableCell>
            <TableCell className={classes.tableCell}>{props.truck.licencePlate}</TableCell>
            <TableCell className={classes.tableCell}>{props.truck.gearbox} / {props.truck.fuel}</TableCell>
            <TableCell className={classes.tableCell}>{props.truck.color} / {props.truck.interior_color}</TableCell>
        </TableRow>
    );
}

const mapStateToProps = (state) => {
    return {
        trucks: state.vehicles.trucks,
        tableFiltered: state.tables.tableFiltered,
        driver: state.drivers.localDriver,
    };
}
export default connect(mapStateToProps)(TrucksTable);