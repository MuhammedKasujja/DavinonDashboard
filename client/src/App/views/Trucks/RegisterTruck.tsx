import CustomAlert from "App/components/Alerts/Alert"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootStore } from "_store/store"
import { clearError } from "_store/truck/actions"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import RegisterCar from "./RegisterCar"

const RegisterTruck: React.FC<any> = () => {
  const [imageName] = React.useState('')
  const dispatch = useDispatch()
  const carsState = useSelector(
    (state: RootStore) => state.vehicles,
  )
  const [open, setOpen] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    console.log({ LogError: carsState.error })
    if (carsState.error) {
      setOpen(true)
    } else {
      setOpen(false)
    }
    if (carsState.success) {
      setIsSuccess(true)
    } else {
      setIsSuccess(false)
    }
  }, [carsState.error, carsState.success])

  React.useEffect(() => {
    // return a function to execute at unmount
    return () => {
      // console.log('component will unmount')
      dispatch(clearError())
    }
  }, []) // notice the empty array
  return (
    <PageContainer>
      <PageContainer>
        <PageToolbar
          title={`Add Cars`}
        />
        <CustomAlert isOpen={open} message={carsState.error} severity='error' onClose={() => {
          dispatch(clearError())
        }} />
        <CustomAlert isOpen={isSuccess} message={carsState.success} severity='success' onClose={() => {
          dispatch(clearError())
        }} />
        <RegisterCar />
      </PageContainer>
    </PageContainer>
  )
}
export default RegisterTruck