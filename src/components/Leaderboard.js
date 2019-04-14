import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Text, Heading } from "grommet";
import { Redirect, withRouter } from "react-router-dom";

class Leaderboard extends Component {
  render() {
    const { usersSorted, authedUser } = this.props;
    if (!authedUser[0]) {
      return <Redirect to="/Login" />;
    }
    return (
      <Box flex direction="column" fill={false}>
        <Heading alignSelf="center" margin="small">
          Leaderboard
        </Heading>
        <Box pad="Large" align="center" justify="center">
          {usersSorted.map((user, i) => {
            return (
              <Box
                margin="small"
                direction="row"
                justify="between"
                align="center"
                flex
                background="light-3"
                key={i}
                elevation="medium"
                width="large"
                border={{ color: "brand", size: "small" }}
              >
                <Box pad="medium" margin="small">
                  <Heading>{i + 1}.</Heading>
                </Box>
                <Box
                  pad="medium"
                  margin="small"
                  direction="column"
                  justify="center"
                  aling="center"
                  className="credentials"
                >
                  <img
                    src={user.avatarURL}
                    alt={`Avatar of ${user.name}`}
                    className="avatar"
                  />
                  <Text>{user.name}</Text>
                </Box>

                <Box pad="medium" margin="small">
                  <Text>Asked: {user.questions.length}</Text>
                </Box>
                <Box pad="medium" margin="small">
                  <Text>Answered: {Object.keys(user.answers).length}</Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const usersSorted = Object.values(users).sort(
    (a, b) =>
      Object.keys(b.answers).length +
      b.questions.length -
      (Object.keys(a.answers).length + a.questions.length)
  );

  return {
    usersSorted,
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(Leaderboard));
