import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import history from '~/services/history';

import PrivateRoute from '~/routes/private';

import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';
import Main from '~/pages/Main';

const Routes = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <PrivateRoute path='/signin' component={SignIn} />
        <PrivateRoute path='/signup' component={SignUp} />
        <PrivateRoute path='/' exact component={Main} isPrivate />
      </Switch>
    </ConnectedRouter>
  );
};

export default Routes;
