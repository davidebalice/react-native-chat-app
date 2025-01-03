import { createStore, compose, combineReducers, applyMiddleware } from "redux";

const thunkMiddleware = require("redux-thunk").thunk;
import { authReducer } from "./reducers/authReducer";
import { messengerReducer } from "./reducers/messengerReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  messenger: messengerReducer,
});

const middleware = [thunkMiddleware];

const store = createStore(rootReducer, compose(applyMiddleware(...middleware)));

export default store;
