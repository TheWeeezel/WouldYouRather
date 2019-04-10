import React, { Component } from "react";
import { connect } from "react-redux";
import { Anchor, Box, Heading, Text } from "grommet";
import { Redirect, withRouter } from "react-router-dom";

class Error extends Component {
  state = {
    redirect: false
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/Login" />;
    }

    return (
      <Box align="center" flex justify="center">
        <Box
          flex
          pad="medium"
          margin="medium"
          border={{ color: "brand", size: "small" }}
          elevation="small"
          direction="column"
          fill={false}
          round="small"
          width="large"
        >
          <Heading alignSelf="center" margin="small">
            Error 404
          </Heading>
          <Box flex pad="medium">
            <Text>There is no Question with this ID</Text>
            <Anchor
              onClick={() => this.setState({ redirect: true })}
              label="Click here to be redirected"
            />
          </Box>
        </Box>
      </Box>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users: Object.values(users)
  };
}

export default withRouter(connect(mapStateToProps)(Error));
