import React, { Component } from "react";
import { connect } from "react-redux";
import { Box, Button, Heading, TextInput } from "grommet";
import { withRouter } from "react-router-dom";

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
          Would you rather?
        </Heading>
        <Box flex pad="medium">
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
    );
  }
}

export default withRouter(connect()(NewQuestion));
