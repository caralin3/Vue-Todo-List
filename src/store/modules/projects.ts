import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as fb from '@/firebase';
import { MutationType } from '@/store/mutation-types';
import { Project } from '@/types';

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
      fb.projectsCollection.where('startDate', '<=', new Date().toString())
        .orderBy('startDate', 'desc').get()
        .then((querySnapshot: any) => {
          newProj = querySnapshot.docs[0].data();
          newProj.startDate = new Date(querySnapshot.docs[0].data().startDate);
          newProj.updatedDate = new Date(querySnapshot.docs[0].data().updatedDate);
          if (newProj.endDate) {
            newProj.endDate = new Date(querySnapshot.docs[0].data().endDate);
          }
          newProj.id = querySnapshot.docs[0].id;
          fb.projectsCollection.get().then((snap: any) => {
            const length = snap.size;
            if (length > 1) {
              commit(MutationType.ADD_PROJECT, newProj);
            }
          });
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
    fb.projectsCollection.doc(proj.id).get().then((doc: any) => {
      for (const fid of doc.data().features) {
        fb.featuresCollection.doc(fid).get().then((featDoc: any) => {
          for (const id of featDoc.data().items) {
            // Delete associated items
            fb.itemsCollection.doc(id).delete().then(() => {
              console.log(`Item ${id} successfully deleted!`);
            }).catch((err: any) => {
              console.log(err.message);
            });
          }
        }).catch((err: any) => {
          console.log(err.message);
        });
        // Delete associated features
        fb.featuresCollection.doc(fid).delete().then(() => {
          console.log(`Feature ${fid} successfully deleted!`);
        }).catch((err: any) => {
          console.log(err.message);
        });
      }
    }).catch((err: any) => {
      console.log(err.message);
    });
    // Delete Project
    fb.projectsCollection.doc(proj.id).delete().then(() => {
      console.log(`Project ${proj.id} successfully deleted!`);
      commit(MutationType.REMOVE_PROJECT, proj);
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeAllProjects: ({commit}): any => {
    // TODO: Remove from Firebase
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
