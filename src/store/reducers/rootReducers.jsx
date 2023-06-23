import { combineReducers } from "redux";
import loadingReducer from "./loading.reducer";
import notifyReducer from './notify.reducer'
import alertReducer from "./alert.reducer";
import oauthReducer from "./oauth.reducer";

const rootReducer = combineReducers({
    loadingReducer,
    notifyReducer,
    alertReducer,
    oauthReducer
})

export default rootReducer