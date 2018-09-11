import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Item, Project } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Project1 } from '@/store/state';
import { stat } from 'fs';

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
    const index = state.projects.findIndex((p: Project) => p.id === proj.id);
    if (index !== -1) {
      state.projects.splice(index, 1, proj);
    }
  },
  [MutationType.REMOVE_PROJECT]: (state: ProjectState, proj: Project) => {
    state.projects.splice(state.projects.indexOf(proj), 1);
  },
  [MutationType.REMOVE_ALL_PROJECTS]: (state: ProjectState) => {
    state.projects = [];
  },
};

const getters: GetterTree<ProjectState, any> = {
  // getProjects(state: ProjectState): Project[] {
  //   return state.projects;
  // },
  // projectName(state: ProjectState, id: string): string {
  //   const index = state.projects.findIndex((p: Project) => p.id === id);
  //   console.log(id, index, state.projects[index]);
  //   if (index !== -1) {
  //     return state.projects[index].title;
  //   }
  //   return '';
  // },
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
