import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import store from '~/store';

const PrivateRoute = ({
  component: Component,
  isPrivate,
  location,
  ...rest
}) => {
  const { signedIn } = store.getState().auth;

  if (!signedIn && isPrivate) {
    return <Redirect to={{ pathname: '/signin', state: { from: location } }} />;
  }

  if (signedIn && !isPrivate) {
    return <Redirect to={{ pathname: '/', state: { from: location } }} />;
  }

  return <Route {...rest} render={props => <Component {...props} />} />;
};

PrivateRoute.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func,
    PropTypes.object,
  ]).isRequired,
};

PrivateRoute.defaultProps = {
  isPrivate: false,
};

export default PrivateRoute;
