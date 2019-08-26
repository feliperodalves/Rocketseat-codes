import React from 'react';
import { Switch } from 'react-router-dom';

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import Dashboard from '~/pages/Dashboard';
import Profile from '~/pages/Profile';
import MeetupDetails from '~/pages/MeetupDetails';
import MeetupEditor from '~/pages/MeetupEditor';

import PrivateRoute from './PrivateRoute';

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute path="/" exact component={SignIn} />
      <PrivateRoute path="/register" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} isPrivate />
      <PrivateRoute path="/profile" component={Profile} isPrivate />
      <PrivateRoute path="/meetup/new/" component={MeetupEditor} isPrivate />
      <PrivateRoute
        path="/meetup/details/:id"
        component={MeetupDetails}
        isPrivate
      />
      <PrivateRoute
        path="/meetup/editor/:id"
        component={MeetupEditor}
        isPrivate
      />
    </Switch>
  );
}
