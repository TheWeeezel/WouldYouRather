import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Text } from "grommet";
import { Link, Redirect, withRouter } from "react-router-dom";

import { handleSaveQuestionAnswer } from "../actions/questions";
import { formatQuestion, formatDate } from "../utils/helpers";

class Poll extends Component {
  state = {};

  handleClick = (question, answer) => {
    const { dispatch } = this.props;
    // console.log("Question: ", question);
    // console.log("Question: ", answer);
    dispatch(handleSaveQuestionAnswer(question, answer));
  };

  render() {
    const { question, user, authedUser } = this.props;
    const { timestamp, optionOne, optionTwo } = question;
    const { name, avatarURL } = user;

    const selectedQuestion = question.optionOne.votes.includes(authedUser)
      ? "optionOne"
      : question.optionTwo.votes.includes(authedUser)
      ? "optionTwo"
      : false;

    const newQuestion = question.optionOne.votes.includes(authedUser)
      ? true
      : question.optionTwo.votes.includes(authedUser)
      ? true
      : false;

    const votes =
      question.optionOne.votes.length + question.optionTwo.votes.length;

    console.log(newQuestion);
    console.log(votes);

    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }

    return (
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
          <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
          <span>{name}</span>
          <div>{formatDate(timestamp)}</div>
        </Box>

        <Box flex direction="row" align="center" pad="medium">
          <Box>
            <Button
              label={optionOne.text}
              primary={selectedQuestion === "optionOne"}
              onClick={() => this.handleClick(question, "optionOne")}
            />
            {!newQuestion ? null : (
              <Text>
                {question.optionOne.votes.length} / {votes} |
              </Text>
            )}

            <Button
              label={optionTwo.text}
              primary={selectedQuestion === "optionTwo"}
              onClick={() => this.handleClick(question, "optionTwo")}
            />

            {!newQuestion ? null : (
              <Text>
                {question.optionTwo.votes.length} / {votes} |
              </Text>
            )}
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions && questions[id];
  const user = users && users[question.author];

  return {
    id,
    authedUser,
    question,
    user
  };
}

export default withRouter(connect(mapStateToProps)(Poll));
