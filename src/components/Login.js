import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, Select } from "grommet";
import { Redirect, withRouter } from "react-router-dom";

import { handleAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    user: ""
  };

  handleSubmit() {
    const { dispatch } = this.props;
    const { user } = this.state;
    dispatch(handleAuthedUser(user.option));
  }

  render() {
    const { users, authedUser } = this.props;
    const selectUsers = users.map(u => u.id);

    if (authedUser[0]) {
      return <Redirect to="/" />;
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
            Log In
          </Heading>
          <Box flex pad="medium">
            <Select
              options={selectUsers}
              value={this.state.user}
              onChange={option => this.setState({ user: option })}
            />

            <Button
              margin="small"
              alignSelf="center"
              label="Login"
              type="submit"
              onClick={() => this.handleSubmit()}
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

export default withRouter(connect(mapStateToProps)(Login));
