import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Project } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Project1 } from '@/store/state';

export interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [Project1, Project1, Project1],
};

const actions: ActionTree<ProjectState, any> = {
  addProject: ({commit}, proj: Project): any => {
    commit(MutationType.ADD_PROJECT, proj);
  },
  editProject: ({commit}, proj: Project): any => {
    commit(MutationType.EDIT_PROJECT, proj);
  },
  removeProject: ({commit}, proj: Project): any => {
    commit(MutationType.REMOVE_PROJECT, proj);
  },
  removeAllProjects: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_PROJECTS);
  },
};

const mutations: MutationTree<ProjectState> = {
  [MutationType.ADD_PROJECT]: (state: ProjectState, proj: Project) => {
    state.projects.push(proj);
  },
  [MutationType.EDIT_PROJECT]: (state: ProjectState, proj: Project) => {
    state.projects = [
      ...state.projects.filter((p: Project) => p.id !== proj.id),
      proj,
    ];
  },
  [MutationType.REMOVE_PROJECT]: (state: ProjectState, proj: Project) => {
    state.projects.splice(state.projects.indexOf(proj), 1);
  },
  [MutationType.REMOVE_ALL_PROJECTS]: (state: ProjectState) => {
    state.projects = [];
  },
};

const getters: GetterTree<ProjectState, any> = {
  projectCount(state: ProjectState): number {
    return state.projects.length;
  },
};

export const projects = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
