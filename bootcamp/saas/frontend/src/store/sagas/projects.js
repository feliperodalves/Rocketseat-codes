import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '~/services/api';

import ProjectsActions from '~/store/ducks/projects';

export function* getProjects() {
  try {
    const response = yield call(api.get, 'projects');

    yield put(ProjectsActions.getProjectsSuccess(response.data));
  } catch (error) {
    console.log(error);
  }
}

export function* createProject({ name }) {
  try {
    const response = yield call(api.post, 'projects', { name });

    yield put(ProjectsActions.createProjectSuccess(response.data));
    yield put(ProjectsActions.closeProjectModal());
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
