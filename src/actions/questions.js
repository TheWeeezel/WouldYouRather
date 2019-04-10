import { _saveQuestionAnswer, _saveQuestion } from "../utils/_DATA";
import {
  answerQuestionSuccessUser,
  saveQuestionSuccessUser
} from "../actions/users";
import { showLoading, hideLoading } from "react-redux-loading";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_ANSWER = "ADD_ANSWER";
export const ANSWER_QUESTION_SUCCESS = "ANSWER_QUESTION_SUCCESS";
export const ANSWER_QUESTION_FAIL = "ANSWER_QUESTION_FAIL";
export const SAVE_QUESTION_SUCCESS = "SAVE_QUESTION_SUCCESS";

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

function saveQuestionSuccess(payload) {
  return {
    type: SAVE_QUESTION_SUCCESS,
    payload
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
      .then(() => dispatch(answerQuestionSuccess(payload)))
      .then(() => dispatch(answerQuestionSuccessUser(payload)))
      .then(() => dispatch(hideLoading()))
      .catch(() =>
        dispatch(answerQuestionFailure(console.log("Something went wrong")))
      );
  };
}

export function handleSaveQuestion(optionOneText, optionTwoText, id) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    const payload = {
      optionOneText,
      optionTwoText,
      id,
      author: authedUser
    };

    dispatch(showLoading());

    return _saveQuestion(payload)
      .then(() => dispatch(saveQuestionSuccess(payload)))
      .then(() => dispatch(saveQuestionSuccessUser(payload)))
      .then(() => dispatch(hideLoading()))
      .catch(() =>
        dispatch(answerQuestionFailure(console.log("Something went wrong")))
      );
  };
}
