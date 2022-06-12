import { combineReducers } from "redux";
import authReducer from "./reducers/authReducer";
import daremeReducer from "./reducers/daremeReducer";
import fundmeReducer from "./reducers/fundmeReducer";
import fanwallReducer from "./reducers/fanwallReducer";
import loadRedcuer from "./reducers/loadReducer";
import notificationReducer from './reducers/notificationReducer';
import transactionReducer from './reducers/transactionReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    dareme: daremeReducer,
    fundme: fundmeReducer,
    load: loadRedcuer,
    fanwall: fanwallReducer,
    notification: notificationReducer,
    transaction: transactionReducer
});

export default rootReducer;