export const RECEIVE_USERS = "RECEIVE_USERS";
export const ANSWER_QUESTION_SUCCESS_USER = "ANSWER_QUESTION_SUCCESS_USER";
export const SAVE_QUESTION_SUCCESS_USER = "SAVE_QUESTION_SUCCESS_USER";

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
