import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Text, Heading, TextInput } from "grommet";
import { Redirect, withRouter } from "react-router-dom";

class Leaderboard extends Component {
  render() {
    const { usersSorted } = this.props;
    return (
      <Box
        flex
        pad="medium"
        margin="medium"
        border={{ color: "brand", size: "small" }}
        elevation="small"
        direction="column"
        fill={false}
        round="small"
      >
        <Heading alignSelf="center" margin="small">
          Leaderboard
        </Heading>
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
