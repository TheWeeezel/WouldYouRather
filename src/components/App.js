import React, { Component } from "react";
import { Grommet, Box } from "grommet";
import { connect } from "react-redux";
import { Route, Switch } from "react-router";
import { ConnectedRouter } from "connected-react-router";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Poll from "./Poll";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import Error from "./Error";
import { theme } from "../theme";
import { history } from "../store";
class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <ConnectedRouter history={history}>
        <Grommet theme={theme} full>
          <LoadingBar />
          <Nav />
          {this.props.loading === true ? null : (
            <Box pad="medium">
              <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/login" component={Login} />
                <Route path="/poll/:id" component={Poll} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/leaderboard" component={Leaderboard} />
                <Route path="/404" component={Error} />
              </Switch>
            </Box>
          )}
        </Grommet>
      </ConnectedRouter>
    );
  }
}

export default connect()(App);
