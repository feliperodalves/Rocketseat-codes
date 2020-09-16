import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import { reducer as auth } from './auth';
import { reducer as teams } from './teams';
import { reducer as projects } from './projects';

const reducers = history =>
  combineReducers({
    auth,
    teams,
    projects,
    toastr,
    router: connectRouter(history),
  });

export default reducers;
