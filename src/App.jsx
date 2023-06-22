import { ThemeProvider, createTheme } from "@material-ui/core"
import { Provider } from "react-redux"
import { store } from "./store/store"
import UrlRoutes from "./Routes"
import { Loading, Notify, Alert } from "./view/components"
import 'bootstrap/dist/css/bootstrap.min.css'
import './global.css'

const theme = createTheme({

})

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UrlRoutes />
        <Loading />
        <Notify />
        <Alert />
        {/* <Confirm 
          open={true}
          onClose={() => alert('close')}
          onConfirm={() => alert('Confirm')}
        /> */}
      </ThemeProvider>
    </Provider>
  )
}

export default App
