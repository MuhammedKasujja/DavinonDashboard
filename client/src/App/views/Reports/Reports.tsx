import React from "react"
import PageContainer from "../../components/PageContainer/index"
import PageToolbar from "../../components/PageToolbar/index"

const Reports: React.FC<any> = () => {
  const [imageName] = React.useState('')
  return (
    <PageContainer>
      <PageContainer>
        <PageToolbar
          title={`Reports`}
        />
      </PageContainer>
    </PageContainer>
  )
}
export default Reports