import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION_SUCCESS,
  SAVE_QUESTION_SUCCESS
} from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    case ANSWER_QUESTION_SUCCESS:
      const { authedUser, qid, answer } = action.payload;
      const question = state[qid];

      question.optionOne.votes = question.optionOne.votes.filter(
        user => user !== authedUser
      );
      question.optionTwo.votes = question.optionTwo.votes.filter(
        user => user !== authedUser
      );

      return {
        ...state,
        [qid]: {
          ...question,
          [answer]: {
            ...question[answer],
            votes: [...new Set([...question[answer].votes, authedUser])]
          }
        }
      };
    case SAVE_QUESTION_SUCCESS:
      const { id, author, optionOneText, optionTwoText } = action.payload;
      return {
        ...state,
        [id]: {
          id: id,
          author: author,
          optionOne: {
            votes: [],
            text: optionOneText
          },
          optionTwo: {
            votes: [],
            text: optionTwoText
          },
          timestamp: Date.now()
        }
      };
    default:
      return state;
  }
}
