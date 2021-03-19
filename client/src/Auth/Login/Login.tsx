import Card from 'App/components/Card/Card'
import CardBody from 'App/components/Card/CardBody'
import CardHeader from 'App/components/Card/CardHeader'
import TSButton from 'App/components/CustomButtons/TSButton'
import CustomInputText from 'App/components/CustomInput/input'
import PageContainer from 'App/components/PageContainer'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '_store/Users/actions'


const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(login(password, email))
  }
  React.useEffect(() => {
    //// class method {componentDidUpdate}////
    // console.log({ 'Success': props.success })
    // window.location.replace('/admin/dashboard')
  }, [])
  return (
    <PageContainer>
      <div style={{ marginRight: '200', marginLeft: '200' }}>
        <Card >
          <CardHeader>
            <h4>DavinonRides</h4>
          </CardHeader>
          <CardBody>
            <CustomInputText id="Email"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: `${email}`,
                type: 'email'
              }}
              labelText='Email'
              handleChange={(val) => {
                setEmail(val)
              }} />
            <CustomInputText id="Password"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                value: `${password}`,
                type: 'password'
              }}
              labelText='Password'
              handleChange={(val) => {
                setPassword(val)
              }} />
            <TSButton color="primary" onClick={handleLogin} ><Link to={'/admin/dashboard'}>Login</Link></TSButton>
          </CardBody>
        </Card>
      </div >
    </PageContainer >)
}

export default Login
