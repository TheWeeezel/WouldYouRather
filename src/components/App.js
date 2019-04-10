import React, { Component } from "react";
import { Grommet, Box } from "grommet";
import { Redirect, BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Error from "./Error";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    const theme = {
      global: {
        colors: {
          brand: "#228BE6"
        },
        font: {
          family: "Rubik",
          size: "14px",
          height: "20px"
        }
      },
      anchor: {
        fontWeight: "400"
      }
    };

    return (
      <Router>
        <Grommet theme={theme} full>
          <LoadingBar />
          <Nav />
          {this.props.loading === true ? null : (
            <Box pad="medium">
              <Route path="/" exact component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/poll/:id" component={Poll} />
              <Route path="/new" component={NewQuestion} />
              <Route path="/leaderboard" component={Leaderboard} />
              <Route path="/404" component={Error} />
            </Box>
          )}
        </Grommet>
      </Router>
    );
  }
}

export default connect()(App);
