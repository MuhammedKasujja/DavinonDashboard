import React from "react"
import DriverRegisterComponent from "./RegisterComponent"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import Chip from '@material-ui/core/Chip';

class Register extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <PageContainer>
                <PageToolbar
                    title={'Drivers / Register'}
                    actionsComponent={MainActions}
                // actions={<toggleRegistrationType/>}
                />
                <DriverRegisterComponent />
            </PageContainer>
        );
    }

}

export default Register

const MainActions: React.FC<any> = () => {
    const handleClick = () => { }
    return (<div>
        <Chip
            label="Register"
            onClick={handleClick}
            // variant="outlined"
            color="primary"
        />
        <Chip
            label="Register with Vehicle"
            onClick={handleClick}
            variant="outlined"
        />
    </div>)
}


interface ToggleChipProps {
    isSelected: boolean
}

export function toggleRegistrationType(props: ToggleChipProps) {

    const handleClick = () => { }

    return (<div>
        <Chip
            label="Register"
            onClick={handleClick}
            variant="outlined"
        />
        <Chip
            label="Register with Vehicle"
            onClick={handleClick}
            variant="outlined"
        />
    </div>)

}