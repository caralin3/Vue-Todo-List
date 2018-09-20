import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as fb from '@/firebase';
import { Project } from '@/types';
import { MutationType } from '@/store/mutation-types';

export interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const actions: ActionTree<ProjectState, any> = {
  addProject: ({commit}, proj: Project): any => {
    fb.projectsCollection.add(proj).then(() => {
      let newProj: Project;
      fb.projectsCollection.orderBy('startDate', 'desc').limit(1).get()
        .then((querySnapshot: any) => {
          newProj = querySnapshot.docs[0].data();
          newProj.startDate = new Date(querySnapshot.docs[0].data().startDate);
          newProj.updatedDate = new Date(querySnapshot.docs[0].data().updatedDate);
          if (newProj.endDate) {
            newProj.endDate = new Date(querySnapshot.docs[0].data().endDate);
          }
          newProj.id = querySnapshot.docs[0].id;
          commit(MutationType.ADD_PROJECT, newProj);
        });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  editProject: ({commit}, proj: Project): any => {
    fb.projectsCollection.doc(proj.id).update(proj).then(() => {
      const newProj = {
        ...proj,
        startDate: new Date(proj.startDate),
        updatedDate: new Date(proj.updatedDate),
      };
      if (proj.endDate) {
        newProj.endDate = new Date(proj.endDate);
      }
      commit(MutationType.EDIT_PROJECT, newProj);
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeProject: ({commit}, proj: Project): any => {
    commit(MutationType.REMOVE_PROJECT, proj);
  },
  removeAllProjects: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_PROJECTS);
  },
  setProjects: ({commit}, proj: Project): any => {
    commit(MutationType.SET_PROJECTS, proj);
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
  [MutationType.SET_PROJECTS]: (state: ProjectState, projList: Project[]) => {
    state.projects = projList;
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
