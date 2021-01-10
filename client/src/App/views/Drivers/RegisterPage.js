import React from "react"
import DriverRegisterComponent from "./RegisterComponent"
import { connect } from "react-redux"
import { fetchBrands } from "../../redux/actions/brandsActions"
import { fetchCarTypes, fetchTruckBodies, fetchTruckTonnages } from "../../redux/actions/carsActions"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brands: null,
            tonnages: null,
            truckBodies: null,
            vehicleTypes: null
        }
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBrands());
        dispatch(fetchCarTypes())
        dispatch(fetchTruckBodies())
        dispatch(fetchTruckTonnages())
    }

    render() {
        const PageTitle = "Add Drivers";
        return (
            <PageContainer>
                <PageToolbar
                    title={PageTitle}
                />
                <DriverRegisterComponent brandsList={this.props.brands}
                    tonnages={this.props.tonnages} truckBodies={this.props.truckBodies} vehicleTypes={this.props.vehicleTypes} />
            </PageContainer>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        brands: state.brands.brands,
        tonnages: state.vehicles.tonnages,
        truckBodies: state.vehicles.truckBodies,
        vehicleTypes: state.vehicles.vehicleTypes
    };
}
export default connect(mapStateToProps)(Register);