import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/authReducer";
import { userReducer, usersReducer } from "./reducers/userReducer";
import { serviceReducer, servicesReducer } from "./reducers/serviceReducer";
import { categoriesReducer } from "./reducers/categoriesReducer";
import { changeState } from "./reducers/changeStateReducer";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  auth: authReducer,
  user: userReducer,
  users: usersReducer,
  service: serviceReducer,
  services: servicesReducer,
  categories: categoriesReducer,
  changeState: changeState
});

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(thunk))
);
