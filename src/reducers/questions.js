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
        [action.payload.authedUser]: {
          ...state.users[action.payload.authedUser],
          answers: {
            ...state.users[action.payload.authedUser].answers,
            [action.payload.qid]: action.payload.answer
          }
        }
      };
    }
    default:
      return state;
  }
}
