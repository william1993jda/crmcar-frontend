import { ThemeProvider, createTheme } from "@material-ui/core"
import { Provider } from "react-redux"
import { store } from "./store/store"
import 'bootstrap/dist/css/bootstrap.min.css'
import UrlRoutes from "./Routes"


const theme = createTheme({

})

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <UrlRoutes />
      </ThemeProvider>
    </Provider>
  )
}

export default App
