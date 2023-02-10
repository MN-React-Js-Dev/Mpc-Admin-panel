import { combineReducers } from "redux";
import ordersReducer from "./Reducers/ordersReducer";
import usersReducer from "./Reducers/usersReducer";

const rootReducer = combineReducers({
    users: usersReducer,
    orders: ordersReducer,
})

export default rootReducer;
