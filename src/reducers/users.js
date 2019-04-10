import {
  RECEIVE_USERS,
  ANSWER_QUESTION_SUCCESS_USER,
  SAVE_QUESTION_SUCCESS_USER
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };
    case ANSWER_QUESTION_SUCCESS_USER: {
      console.log("T: ", action);
      const { authedUser, qid, answer } = action.payload;
      const user = state[authedUser];
      return {
        ...state,
        [authedUser]: {
          ...user,
          answers: {
            ...user.answers,
            [qid]: answer
          }
        }
      };
    }
    case SAVE_QUESTION_SUCCESS_USER: {
      const { id, author } = action.payload;
      const user = state[author];
      return {
        ...state,
        [author]: {
          ...user,
          questions: {
            ...user.questions.concat(id)
          }
        }
      };
    }
    default:
      return state;
  }
}
