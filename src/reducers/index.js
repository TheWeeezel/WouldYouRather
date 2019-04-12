import { combineReducers } from "redux";
import authedUser from "./authedUser";
import users from "./users";
import questions from "./questions";
import { loadingBarReducer } from "react-redux-loading";
import { connectRouter } from "connected-react-router";

export default history =>
  combineReducers({
    router: connectRouter(history),
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer
  });
