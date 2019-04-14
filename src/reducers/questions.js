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
      console.log("Action: ", action);
      const { author, id, optionOne, optionTwo, timestamp } = action.payload;
      return {
        ...state,
        [id]: {
          id: id,
          author: author,
          optionOne: {
            votes: [],
            text: optionOne.text
          },
          optionTwo: {
            votes: [],
            text: optionTwo.text
          },
          timestamp: timestamp
        }
      };
    default:
      return state;
  }
}
