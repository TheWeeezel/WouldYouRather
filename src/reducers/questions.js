import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION_SUCCESS
} from "../actions/questions";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_QUESTION_SUCCESS: {
      return {
        ...state,
        ...action
      };
    }
    default:
      return state;
  }
}
