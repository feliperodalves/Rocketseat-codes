import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import TeamsActions from '~/store/ducks/teams';

export function* getTeams() {
  try {
    const response = yield call(api.get, 'teams');

    yield put(TeamsActions.getTeamsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createTeam() {
  try {
    const response = yield call(api.post, 'teams');

    yield put(TeamsActions.createTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());
  } catch (error) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro na operação',
        message: 'Houve um erro, tente novamente',
      }),
    );
    console.log(error);
  }
}
