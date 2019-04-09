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
    const { question, poll } = this.props;
    const { author, avatar, timestamp, optionOne, optionTwo, id } = question;

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
          elevation="medium"
          animation="fadeIn"
          margin="small"
        >
          <Box direction="column" className="credentials">
            <img src={avatar} alt={`Avatar of ${author}`} className="avatar" />
            <span>{author}</span>
            <div>{formatDate(timestamp)}</div>
          </Box>

          {poll ? (
            <Box flex direction="row" align="center" pad="medium">
              <Box>
                <Button
                  label={optionOne.text}
                  onClick={() => this.handleClick(question, "optionOne")}
                />
                Stats
              </Box>
              <Box>
                <Button
                  label={optionTwo.text}
                  onClick={() => this.handleClick(question, "optionTwo")}
                />
                Stats
              </Box>
            </Box>
          ) : (
            <div className="question-preview">
              <div>{optionOne.text}</div>
              <div>{optionTwo.text}</div>
            </div>
          )}
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
