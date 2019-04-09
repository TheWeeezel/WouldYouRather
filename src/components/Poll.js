import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, Grommet } from "grommet";
import Question from "./Question";

class Poll extends Component {
  state = {
    unanswered: true
  };

  handleClick = boolean => {
    this.setState({ unanswered: boolean });
  };

  render() {
    const { answeredIds, questionIds } = this.props;

    const unansweredIds = questionIds.filter(f =>
      answeredIds ? !answeredIds.includes(f) : null
    );

    return (
      <Box direction="row" flex overflow={{ horizontal: "hidden" }}>
        <Box flex align="center" justify="center">
          <Heading level="3" margin="none">
            Would you rather?
          </Heading>
          <div>
            {unansweredIds.map((id, i) => (
              <Question poll={true} key={i} id={id} />
            ))}
          </div>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const activeUsersAnswers = users[authedUser] && users[authedUser].answers;
  const allIds = Object.keys(questions);
  const answeredIds = activeUsersAnswers
    ? Object.keys(activeUsersAnswers)
    : null;

  return {
    answeredIds: answeredIds,
    unansweredIds: allIds,
    users,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Poll);
