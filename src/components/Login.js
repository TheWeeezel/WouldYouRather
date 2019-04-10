import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, Select } from "grommet";
import { withRouter } from "react-router-dom";

import { handleAuthedUser } from "../actions/authedUser";

class Login extends Component {
  state = {
    user: ""
  };

  handleSubmit() {
    const { user } = this.state;
    handleAuthedUser(user.option);
  }

  render() {
    const { users } = this.props;
    const selectUsers = users.map(u => u.id);
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
    );
  }
}
function mapStateToProps({ users, questions, authedUser }, { id }) {
  return {
    users: Object.values(users)
  };
}

export default withRouter(connect(mapStateToProps)(Login));
