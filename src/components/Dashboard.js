import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, Grommet } from "grommet";
import Question from "./Question";
import { Redirect } from "react-router-dom";
class Dashboard extends Component {
  state = {
    unanswered: true
  };

  handleClick = boolean => {
    this.setState({ unanswered: boolean });
  };

  render() {
    const { answeredIds, questionIds, authedUser } = this.props;

    const unansweredIds = questionIds.filter(f =>
      answeredIds ? !answeredIds.includes(f) : null
    );

    if (!authedUser[0]) {
      return <Redirect to="/Login" />;
    }

    return (
      <Box
        direction="column"
        flex
        justify="center"
        overflow={{ horizontal: "hidden" }}
      >
        <Box align="center">
          <Heading alignSelf="center" margin="small">
            Would you rather?
          </Heading>
          <Box flex direction="row">
            <Button
              primary={this.state.unanswered}
              label="Unanswered"
              onClick={() => this.handleClick(true)}
            />
            <Button
              primary={!this.state.unanswered}
              label="Answered"
              onClick={() => this.handleClick(false)}
            />
          </Box>
        </Box>
        <Box pad="Large" align="center" justify="center">
          {this.state.unanswered
            ? unansweredIds.map((id, i) => <Question key={i} id={id} />)
            : answeredIds
            ? this.props.answeredIds.map((id, i) => (
                <Question key={i} id={id} />
              ))
            : null}
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
    authedUser,
    answeredIds: answeredIds,
    unansweredIds: allIds,
    users,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    )
  };
}

export default connect(mapStateToProps)(Dashboard);
