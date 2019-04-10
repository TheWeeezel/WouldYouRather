import { SET_AUTHED_USER } from "../actions/authedUser.js";

export default function authedUser(state = {}, action) {
  switch (action.type) {
    case SET_AUTHED_USER:
      console.log("a", action.id);
      return action.id;
    default:
      return state;
  }
}
