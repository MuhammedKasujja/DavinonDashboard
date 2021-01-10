import React from "react"
// import Table from '../../components/Table/Table'
import styles from "../../assets/jss/material-dashboard-react/components/tableStyle";
import { makeStyles } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { Link } from 'react-router-dom'
import { fetchTrips } from "../../redux/actions/tripsActions"
import Button from "../../components/CustomButtons/Button";
import { connect } from "react-redux"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"

const useStyles = makeStyles(styles);

class TripsTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { trips: [] }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchTrips());
    }

    tripsList() {
        return this.props.trips.map((currentTrip, i) => {
            return <TripRow trip={currentTrip} key={currentTrip.id} index={i + 1} />
        })

    }

    render() {
        return (
            <PageContainer>
                <PageToolbar
                    title={`Trips`}
                />
                {/* <Table
                    tableHeaderColor="primary"
                    tableHead={["#", "Date", "From", "To", "Checkpoints", "Distance", "Est. Time", "Status"]}
                    tableData={this.tripsList()}
                /> */}
            </PageContainer>
        );
    }
}

const TripRow = (props) => {
    const classes = useStyles();
    const date = new Date(props.trip.createdOn).toISOString().slice(0, 10)
    const tripStatus = () => {
        var status = props.trip.status;
        if (status === 1) {
            return 'Open'
        } else if (status === 3) {
            return 'Waiting'
        }
        else if (status === 4) {
            return 'Started'
        }
        else if (status === 5) {
            return 'Finished'
        }
        else if (status === 6) {
            return 'Canceled'
        }
    }
    return (
        <TableRow className={classes.tableBodyRow}>
            <TableCell>
                <Link to={{
                    pathname: `/admin/trips/edit/${props.trip.name}`,
                    state: {
                        bankId: props.trip.id
                    }
                }}><i className="fas fa-edit" />{props.index}
                </Link>
            </TableCell>
            <TableCell className={classes.tableCell}>{date}</TableCell>
            <TableCell width={200} className={classes.tableCell}>{props.trip.originAddress}</TableCell>
            <TableCell width={200} className={classes.tableCell}>{props.trip.destinationAddress}</TableCell>
            <TableCell className={classes.tableCell}>
                <Button color="white" aria-label="total" justIcon round>
                    {props.trip.waypoints.length - 1}
                </Button>
            </TableCell>
            <TableCell className={classes.tableCell}>{props.trip.distance}</TableCell>
            <TableCell className={classes.tableCell}>{props.trip.duration}</TableCell>
            <TableCell className={classes.tableCell}>{tripStatus()}</TableCell>
        </TableRow>
    );
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips.trips
    };
}
export default connect(mapStateToProps)(TripsTable);