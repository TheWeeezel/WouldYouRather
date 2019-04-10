import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, TextInput } from "grommet";
import { withRouter, Redirect } from "react-router-dom";

import { handleSaveQuestion } from "../actions/questions";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: ""
  };

  generateUID() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

  handleSubmit = event => {
    const id = this.generateUID();
    const { dispatch } = this.props;
    const { optionOneText, optionTwoText } = this.state;
    dispatch(handleSaveQuestion(optionOneText, optionTwoText, id));
    event.preventDefault();
  };

  render() {
    const { authedUser } = this.props;
    if (!authedUser[0]) {
      return <Redirect to="/Login" />;
    }
    return (
      <Box flex direction="column" fill={false}>
        <Heading alignSelf="center" margin="small">
          Would you rather?
        </Heading>
        <Box align="center" flex justify="center">
          <Box
            flex
            border={{ color: "brand", size: "small" }}
            pad="medium"
            elevation="medium"
            animation="fadeIn"
            fill={false}
            round="small"
            width="large"
            margin="medium"
          >
            <TextInput
              size="medium"
              type="text"
              value={this.state.optionOneText}
              placeholder="... that"
              onChange={e => this.setState({ optionOneText: e.target.value })}
            />
            <TextInput
              size="medium"
              type="text"
              value={this.state.optionTwoText}
              placeholder="... this"
              onChange={e => this.setState({ optionTwoText: e.target.value })}
            />

            <Button
              margin="small"
              alignSelf="center"
              label="Create"
              type="submit"
              onClick={event => this.handleSubmit(event)}
            />
          </Box>
        </Box>
      </Box>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser
  };
}

export default withRouter(connect(mapStateToProps)(NewQuestion));
