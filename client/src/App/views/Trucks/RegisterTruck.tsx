import React from "react"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"
import RegisterCar from "./RegisterCar"

const RegisterTruck: React.FC<any> = () => {
  const [imageName] = React.useState('')
  return (
    <PageContainer>
      <PageContainer>
        <PageToolbar
          title={`Add Cars`}
        />
        <RegisterCar />
      </PageContainer>
    </PageContainer>
  )
}
export default RegisterTruck