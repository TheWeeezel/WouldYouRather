import React, { Component } from "react";
import { Grommet } from "grommet";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import LoadingBar from "react-redux-loading";
import Nav from "./Nav";
import Dashboard from "./Dashboard";
import Poll from "./Poll";

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
              <div>
                <Poll />
              </div>
            )}
          </div>
        </Grommet>
      </Router>
    );
  }
}

export default connect()(App);
