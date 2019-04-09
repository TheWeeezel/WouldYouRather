import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION_SUCCESS
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_QUESTION_SUCCESS: {
      return {
        ...state,

        ...questions,
        [action.qid]: {
          ...questions[action.qid],
          [action.answer]: {
            ...questions[action.qid][action.answer],
            votes: questions[action.qid][action.answer].votes.concat([
              action.authedUser
            ])
          }
        }
      };
    }
    default:
      return state;
  }
}
