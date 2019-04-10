import React, { Component } from "react";
import { Grommet, Box } from "grommet";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Auth from "../utils/auth";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";

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
      }
    };

    return (
      <Router>
        <Grommet theme={theme} full>
          <LoadingBar />
          <div className="container">
            <Nav />
            {this.props.loading === true ? null : (
              <Box pad="xlarge">
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/poll/:id" component={Auth(Poll)} />
                <Route path="/new" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
              </Box>
            )}
          </div>
        </Grommet>
      </Router>
    );
  }
}

export default connect()(App);
