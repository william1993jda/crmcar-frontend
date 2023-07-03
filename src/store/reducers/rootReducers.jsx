import { combineReducers } from "redux";
import loadingReducer from "./loading.reducer";
import notifyReducer from './notify.reducer'
import alertReducer from "./alert.reducer";
import oauthReducer from "./oauth.reducer";
import registerReducer from "./register.reducer";
import vehiclesReducer from "./vehicles.reducer";

const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    oauthReducer,
    registerReducer,
    vehiclesReducer
})

export default rootReducer