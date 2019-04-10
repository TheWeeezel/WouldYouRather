import React, { Component } from "react";
import { connect } from "react-redux";
import { Anchor, Box, Text } from "grommet";
import { withRouter, NavLink } from "react-router-dom";
import { handleRemoveAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  handleClick() {
    console.log("step");
    const { dispatch } = this.props;
    dispatch(handleRemoveAuthedUser());
  }
  render() {
    const { authedUser } = this.props;

    return authedUser[0] ? (
      <Box flex direction="row" pad="medium" justify="between">
        <Box flex direction="row">
          <Box pad="medium">
            <NavLink to="/" exact style={{ textDecoration: "none" }}>
              <Anchor href="#" size="medium" primary label="Home" />
            </NavLink>
          </Box>
          <Box pad="medium">
            <NavLink to="/new" style={{ textDecoration: "none" }}>
              <Anchor href="#" size="medium" primary label="New Question" />
            </NavLink>
          </Box>
          <Box pad="medium">
            <NavLink to="/leaderboard" style={{ textDecoration: "none" }}>
              <Anchor href="#" size="medium" primary label="Leaderboard" />
            </NavLink>
          </Box>
        </Box>
        <Box flex direction="row" justify="end">
          <Box pad="medium">
            <Text>{authedUser[0] ? authedUser : null}</Text>
          </Box>
          <Box pad="medium">
            <Anchor
              onClick={() => this.handleClick()}
              size="medium"
              primary
              label="Logout"
            />
          </Box>
        </Box>
      </Box>
    ) : null;
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(Nav));
