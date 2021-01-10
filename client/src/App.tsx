import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import CssBaseline from '@material-ui/core/CssBaseline'
// import { rootReducer } from "./App/redux/reducers/index";
import {Store} from "_store/store"
// import { RootState } from "./_store/store";
// import store from './_state'
import theme from './_theme'

import AppRouter from './AppRouter'

const App: React.FC = () => {
  return (
    <div className="App">
      <CssBaseline />
      <AppRouter />
    </div>
  )
}
export default () => (
  <ThemeProvider theme={theme}>
    <Provider store={Store}>
      <App />
    </Provider>
  </ThemeProvider>
)
