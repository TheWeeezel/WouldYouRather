import React, { Component } from "react";
import { connect } from "react-redux";
import { Box } from "grommet";

import { formatQuestion, formatDate } from "../utils/helpers";
import { Link, withRouter } from "react-router-dom";

class Question extends Component {
  render() {
    const { question, authedUser } = this.props;
    const { name, avatar, timestamp, optionOne, optionTwo, id } = question;

    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }

    return (
      <Link to={`/question/${id}`}>
        <Box
          direction="row"
          border={{ color: "brand", size: "large" }}
          pad="medium"
          background="brand"
        >
          <div className="credentials">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </div>

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

  return {
    authedUser,
    question: question ? formatQuestion(question, users[question.author]) : null
  };
}

export default withRouter(connect(mapStateToProps)(Question));
