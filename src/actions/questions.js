import { saveQuestionAnswer, saveQuestion } from "../utils/api";
import {
  answerQuestionSuccessUser,
  saveQuestionSuccessUser
} from "../actions/users";
import { push } from "connected-react-router";
import { showLoading, hideLoading } from "react-redux-loading";
import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION_SUCCESS,
  ANSWER_QUESTION_FAIL,
  SAVE_QUESTION_SUCCESS
} from "./types";

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

    return saveQuestionAnswer(payload)
      .then(() => dispatch(answerQuestionSuccess(payload)))
      .then(() => dispatch(answerQuestionSuccessUser(payload)))
      .then(() => dispatch(hideLoading()))
      .catch(() =>
        dispatch(answerQuestionFailure(console.log("Something went wrong")))
      );
  };
}

export function handleSaveQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    let { users } = getState();
    dispatch(showLoading());

    return saveQuestion({ ...question, author: authedUser })
      .then(question => dispatch(saveQuestionSuccess(question)))
      .then(question => dispatch(saveQuestionSuccessUser({ users, question })))
      .then(() => dispatch(push("/")))
      .then(() => dispatch(hideLoading()))
      .catch(() =>
        dispatch(answerQuestionFailure(console.log("Something went wrong")))
      );
  };
}
