import { combineReducers } from "redux";
import AuthSlice from "../../Actions/Auth/Auth";
import errorSlice from "../../Actions/errorSlice/errorSlice";
const reducers = combineReducers({ AuthSlice, errorSlice });

export default reducers;
