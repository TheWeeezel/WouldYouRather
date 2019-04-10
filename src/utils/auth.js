import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Auth = Component => props => {
  const { authedUser, ...rest } = props;

  if (!authedUser)
    return (
      <Redirect
        to={{
          pathname: "/login"
        }}
      />
    );

  return <Component {...rest} />;
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

const Authed = compose(
  connect(mapStateToProps),
  Auth
);

export default Authed;
