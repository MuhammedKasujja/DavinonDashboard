import React from "react"
import RegisterCarBrand from "./RegisterCarBrand"
import { connect } from "react-redux"
import { fetchBrands } from "../../redux/actions/brandsActions"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"

class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            brands: null
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchBrands())
    }

    render() {
        return (
            <PageContainer>
                <PageToolbar
                    title={`Add Car Models`}
                />
                <RegisterCarBrand brandsList={this.props.brands} />
            </PageContainer>);
    }

}

const mapStateToProps = (state) => {
    return {
        brands: state.brands.brands
    };
}
export default connect(mapStateToProps)(Register);