import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Text, Heading } from "grommet";
import { Link, withRouter } from "react-router-dom";

import { handleSaveQuestionAnswer } from "../actions/questions";
import { formatDate } from "../utils/helpers";

class Question extends Component {
  handleClick = (question, answer) => {
    const { dispatch } = this.props;
    // console.log("Question: ", question);
    // console.log("Question: ", answer);
    dispatch(handleSaveQuestionAnswer(question, answer));
  };

  render() {
    const { question, user } = this.props;
    const { timestamp, optionOne, optionTwo, id } = question;
    const { name, avatarURL } = user;

    return (
      <Link to={`/poll/${id}`} style={{ textDecoration: "none" }}>
        <Box
          direction="row"
          border={{ color: "brand", size: "small" }}
          pad="medium"
          elevation="medium"
          animation="fadeIn"
          fill={false}
          round="small"
          margin="medium"
          width="large"
        >
          <Box direction="column" justify="center" align="center">
            <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
            <span>{name}</span>
            <div>{formatDate(timestamp)}</div>
          </Box>

          <Box pad="medium">
            <Heading level="4">Choose:</Heading>
            <Text>{optionOne.text}</Text>
            <Text>{optionTwo.text}</Text>
          </Box>
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
