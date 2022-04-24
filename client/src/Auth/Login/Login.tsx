import Card from 'App/components/Card/Card'
import CardBody from 'App/components/Card/CardBody'
import TSButton from 'App/components/CustomButtons/TSButton'
import CustomInputText from 'App/components/CustomInput/input'
import PageContainer from 'App/components/PageContainer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { RootStore } from '_store/store'
import { clearError, login } from '_store/Users/actions'
import CircularProgressIndicator from '@material-ui/core/CircularProgress'
import { Collapse, createStyles, IconButton, makeStyles, Theme, Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close';


const Login: React.FC = () => {
  const authState = useSelector(
    (state: RootStore) => state.auth,
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = React.useState(false);

  const classes = useStyles()

  const handleLogin = (e: any) => {
    e.preventDefault()
    dispatch(login(password, email))
  }
  
  useEffect(() => {
    if (authState.user) {
      history.replace('/admin/dashboard')
    }
    console.log({ LogError: authState.error })
    if (authState.error) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [authState.user, authState.error])

  useEffect(() => {
      dispatch(clearError())
  }, [])

  useEffect(() => {
    return () => {
      dispatch(clearError())
    }
  }, [])

  return (
    <PageContainer>
      <div style={{ top: '50%', left: '50%', width: '300px', position: "fixed", transform: "translate(-50%, -50%)" }}>
        <h3>DavinonRides</h3>
        {/* {authState.error && (<Alert severity="error" onClick={() => dispatch(clearError())}>
            {authState.error}
          </Alert>)} */}
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  dispatch(clearError())
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {authState.error}
          </Alert>
        </Collapse>
        <Card >
          <form noValidate onSubmit={handleLogin}>
            <CardBody>
              <CustomInputText id="Email"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: `${email}`,
                  type: 'email',
                  required: true
                }}
                labelText='Email'
                handleChange={(val) => {
                  setEmail(val)
                  dispatch(clearError())
                }} />
              <CustomInputText id="Password"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value: `${password}`,
                  type: 'password',
                  required: true
                }}
                labelText='Password'
                handleChange={(val) => {
                  setPassword(val)
                  dispatch(clearError())
                }} />
              <TSButton disabled={authState.isLoading} type='submit'>
                {authState.isLoading && <CircularProgressIndicator size={20} color='secondary' className={classes.progress} />}
                <p style={{ margin: '2px' }}>Login</p>
              </TSButton>
            </CardBody>
          </form>
        </Card>
      </div >
    </PageContainer >)
}

export default Login


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      position: 'relative'
    },
  }),
);