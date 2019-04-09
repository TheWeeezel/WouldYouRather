import { _saveQuestionAnswer } from "../utils/_DATA";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ANSWER_QUESTION_SUCCESS = "ANSWER_QUESTION_SUCCESS";
export const ANSWER_QUESTION_FAIL = "ANSWER_QUESTION_FAIL";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  };
}

function answerQuestionSuccess(payload) {
  return {
    type: ANSWER_QUESTION_SUCCESS,
    payload
  };
}

function answerQuestionFailure(error) {
  return {
    type: ANSWER_QUESTION_FAIL,
    error
  };
}

export function handleSaveQuestionAnswer(question, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const payload = {
      authedUser,
      qid: question.id,
      answer
    };

    dispatch(showLoading());

    return _saveQuestionAnswer(payload)
      .then(payload => dispatch(answerQuestionSuccess(payload)))
      .then(() => dispatch(hideLoading()))
      .catch(() =>
        dispatch(answerQuestionFailure(console.log("Something went wrong")))
      );
  };
}
