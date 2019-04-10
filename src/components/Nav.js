import React from "react";
import { Box, Button, Heading, TextInput } from "grommet";
import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <Box flex direction="row" pad="medium">
      <Box pad="medium">
        <NavLink to="/" exact activeClassName="active">
          Home
        </NavLink>
      </Box>
      <Box pad="medium">
        <NavLink to="/new" activeClassName="active">
          New Question
        </NavLink>
      </Box>
      <Box pad="medium">
        <NavLink to="/leaderboard" activeClassName="active">
          Leaderboard
        </NavLink>
      </Box>
    </Box>
  );
}
