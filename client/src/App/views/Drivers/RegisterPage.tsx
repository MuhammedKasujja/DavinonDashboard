import React from "react"
import DriverRegisterComponent from "./RegisterComponent"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"

class Register extends React.Component {
    constructor(props:any) {
        super(props)
    }

    render() {
        return (
            <PageContainer>
                <PageToolbar
                    title={'Add Drivers'}
                />
                <DriverRegisterComponent />
            </PageContainer>
        );
    }

}

export default Register