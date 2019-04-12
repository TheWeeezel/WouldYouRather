import thunk from "redux-thunk";
import logger from "./logger";
import { applyMiddleware } from "redux";
import { routerMiddleware, browserHistory } from "react-router-redux";

export default applyMiddleware(thunk, routerMiddleware(browserHistory), logger);
