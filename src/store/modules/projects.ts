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
      fb.projectsCollection.orderBy('startDate', 'asc')
        .onSnapshot((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            newProj = doc.data();
            newProj.startDate = new Date(doc.data().startDate);
            newProj.updatedDate = new Date(doc.data().updatedDate);
            if (newProj.endDate) {
              newProj.endDate = new Date(doc.data().endDate);
            }
            newProj.id = doc.id;
          });
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
