import { ThemeProvider, createTheme } from "@material-ui/core"
import { Provider } from "react-redux"
import { store } from "./store/store"
import 'bootstrap/dist/css/bootstrap.min.css'
import UrlRoutes from "./Routes"
import { Loading, Notify, Alert } from "./view/components"
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
      </ThemeProvider>
    </Provider>
  )
}

export default App
