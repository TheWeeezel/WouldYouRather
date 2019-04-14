import {
  RECEIVE_USERS,
  ANSWER_QUESTION_SUCCESS_USER,
  SAVE_QUESTION_SUCCESS_USER
} from "./types";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  };
}

export function answerQuestionSuccessUser(payload) {
  return {
    type: ANSWER_QUESTION_SUCCESS_USER,
    payload
  };
}

export function saveQuestionSuccessUser(payload) {
  return {
    type: SAVE_QUESTION_SUCCESS_USER,
    payload
  };
}
