import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button } from "grommet";
import { Link, withRouter } from "react-router-dom";

import { handleSaveQuestionAnswer } from "../actions/questions";
import { formatQuestion, formatDate } from "../utils/helpers";

class Question extends Component {
  handleClick = (question, answer) => {
    const { dispatch } = this.props;
    // console.log("Question: ", question);
    // console.log("Question: ", answer);
    dispatch(handleSaveQuestionAnswer(question, answer));
  };

  render() {
    const { question, poll, user } = this.props;
    const { timestamp, optionOne, optionTwo, id } = question;
    const { name, avatarURL } = user;

    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }

    return (
      <Link to={`/poll/${id}`}>
        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="medium"
          elevation="medium"
          animation="fadeIn"
          fill={false}
          round="small"
          margin="medium"
        >
          <Box direction="column" className="credentials">
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </Box>

          <div className="question-preview">
            <div>{optionOne.text}</div>
            <div>{optionTwo.text}</div>
          </div>
        </Box>
      </Link>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, { id }) {
  const question = questions[id];
  const user = users && users[question.author];

  return {
    authedUser,
    question,
    user
  };
}

export default withRouter(connect(mapStateToProps)(Question));
