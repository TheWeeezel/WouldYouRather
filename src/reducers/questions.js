import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION_SUCCESS
} from "../actions/questions";

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_QUESTION_SUCCESS: {
      return {
        ...state,
        ...action.payload
      };
    }
    default:
      return state;
  }
}
