import { showLoading, hideLoading } from "react-redux-loading";
import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from "./types";

export function setAuthedUser(id) {
  return {
    type: SET_AUTHED_USER,
    id
  };
}

function removeAuthedUser() {
  return {
    type: REMOVE_AUTHED_USER
  };
}

export function handleAuthedUser(user) {
  return dispatch => {
    dispatch(showLoading());
    dispatch(setAuthedUser(user));
    dispatch(hideLoading());
  };
}

export function handleRemoveAuthedUser() {
  return dispatch => {
    dispatch(showLoading());
    dispatch(removeAuthedUser());
    dispatch(hideLoading());
  };
}
