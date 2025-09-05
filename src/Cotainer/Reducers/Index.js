import { combineReducers } from "redux";
import AuthSlice from "../../Actions/Auth/Auth";
import errorSlice from "../../Actions/errorSlice/errorSlice";
import ParkingPlacess from "../../Actions/Pages/Placess/Placess";
const reducers = combineReducers({ AuthSlice, errorSlice, ParkingPlacess });

export default reducers;
