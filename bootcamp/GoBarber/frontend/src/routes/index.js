import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';

import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={SignIn} />
      <PrivateRoute path="/register" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} isPrivate />
      <PrivateRoute path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
