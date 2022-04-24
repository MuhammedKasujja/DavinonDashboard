import React, { useState } from "react"
import DriverRegisterComponent from "./RegisterComponent"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import Chip from '@material-ui/core/Chip';
import Link from "@material-ui/core/Link";
import { RootStore } from "_store/store";
import { useDispatch, useSelector } from "react-redux"
import CustomAlert from "App/components/Alerts/Alert";
import { clearError } from "_store/truck/actions";

const Register: React.FC<any> = () => {
    const dispatch = useDispatch()
    const carsState = useSelector(
        (state: RootStore) => state.vehicles,
    )
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        console.log({ LogError: carsState.error })
        if (carsState.error) {
          setOpen(true)
        } else {
          setOpen(false)
        }
      }, [ carsState.error])
    return (
        <PageContainer>
            <PageToolbar
                title={'Register Driver'}
                actionsComponent={MainActions}
            // actions={<toggleRegistrationType/>}
            />
            <CustomAlert isOpen={open} message={carsState.error} severity='error' onClose={()=>{
                dispatch(clearError())
            }}/>
            <DriverRegisterComponent />
        </PageContainer>
    );
}


export default Register

const MainActions: React.FC<any> = () => {


    return (<div>
        Dashboard / <Link href="#/admin/drivers">Drivers</Link>
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