import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { reducer as toastr } from 'react-redux-toastr';
import { reducer as authReducer } from './auth';

const reducers = history =>
  combineReducers({
    authReducer,
    toastr,
    router: connectRouter(history),
  });

export default reducers;
