import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* Types & Action Creators */

const { Types, Creators } = createActions({
  getProjectsRequest: null,
  getProjectsSuccess: ['data'],
  selectProject: ['project'],
  openProjectModal: null,
  closeProjectModal: null,
  createProjectRequest: ['newProject'],
  createProjectSuccess: ['project'],
});

export const ProjectsTypes = Types;
export default Creators;

/* Initial State */

export const INITIAL_STATE = Immutable({
  data: [],
  projectModalOpen: false,
  active: JSON.parse(localStorage.getItem('@SAAS:project')) || null,
});

/* Reducers */

export const getSuccess = (state, { data }) => state.merge({ data });
export const openModal = state => state.merge({ projectModalOpen: true });
export const closeModal = state => state.merge({ projectModalOpen: false });
export const selectProject = (state, { project }) => {
  localStorage.setItem('@SAAS:project', JSON.stringify(project));
  return state.merge({ active: project });
};
export const createSuccess = (state, { project }) =>
  state.merge({ data: [...state.data, project] });

/* Reducers to types */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.GET_PROJECTS_SUCCESS]: getSuccess,
  [Types.SELECT_PROJECT]: selectProject,
  [Types.OPEN_PROJECT_MODAL]: openModal,
  [Types.CLOSE_PROJECT_MODAL]: closeModal,
  [Types.CREATE_PROJECT_SUCCESS]: createSuccess,
});
