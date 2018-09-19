import Vue from 'vue';
import Vuex from 'vuex';
import * as fb from '@/firebase';
import { comments } from './modules/comments';
import { features } from './modules/features';
import { items } from './modules/items';
import { links } from './modules/links';
import { projects } from './modules/projects';
import { MutationType } from './mutation-types';
import { RootState } from './types';
import { Feature, Project } from '@/types';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

// Handle page reload
fb.auth.onAuthStateChanged((user: any) => {
  if (user) {
    // Set current user
    fb.usersCollection.doc(user.uid).get()
      .then((curr: any) => {
        const currentUser = {
          email: curr.data().email,
          firstName: curr.data().firstName,
          id: curr.id,
          lastName: curr.data().lastName,
        };
        store.commit(MutationType.SET_CURRENT_USER, currentUser);
        store.commit(MutationType.SET_USER_PROFILE, currentUser);
      });

    fb.usersCollection.doc(user.uid).onSnapshot((doc: any) => {
      store.commit(MutationType.SET_USER_PROFILE, doc.data());
    });

    // realtime updates for projects collection
    fb.projectsCollection.orderBy('startDate', 'asc').onSnapshot((querySnapshot: any) => {
      if (querySnapshot.docChanges().length === querySnapshot.docs.length) {
        const projectList: Project[] = [];

        querySnapshot.forEach((doc: any) => {
          const project = doc.data();
          project.startDate = new Date(doc.data().startDate);
          project.updatedDate = new Date(doc.data().updatedDate);
          if (project.endDate) {
            project.endDate = new Date(doc.data().endDate.toString());
          }
          project.id = doc.id;
          projectList.push(project);
        });

        store.commit('projects/' + MutationType.SET_PROJECTS, projectList);
      }
    });

    // realtime updates for features collection
    fb.featuresCollection.orderBy('startDate', 'asc').onSnapshot((querySnapshot: any) => {
      if (querySnapshot.docChanges().length === querySnapshot.docs.length) {
        const featureList: Feature[] = [];

        querySnapshot.forEach((doc: any) => {
          const feature = doc.data();
          feature.startDate = new Date(doc.data().startDate);
          feature.updatedDate = new Date(doc.data().updatedDate);
          if (feature.endDate) {
            feature.endDate = new Date(doc.data().endDate.toString());
          }
          feature.id = doc.id;
          featureList.push(feature);
        });

        store.commit('features/' + MutationType.SET_FEATURES, featureList);
      }
    });
  }
});

const store = new Vuex.Store<RootState>({
  state: {
    currentUser: null,
    userProfile: {},
  },
  actions: {
    resetData({commit}, state: RootState) {
      commit(MutationType.RESET_DATA, state);
    },
    setCurrentUser({commit}, state: RootState) {
      commit(MutationType.SET_CURRENT_USER, state);
    },
    setUserProfile({commit}, state: RootState) {
      commit(MutationType.SET_USER_PROFILE, state);
    },
    fetchUserProfile({commit}, currentUser: any) {
      fb.usersCollection.doc(currentUser.user.uid).get()
        .then((user: any) => {
          commit(MutationType.SET_USER_PROFILE, user.data());
        }).catch((err: any) => {
          console.log(err.message);
        });
    },
  },
  mutations: {
    [MutationType.RESET_DATA]: (state: RootState) => {
      state.currentUser = null;
      state.userProfile = {};
    },
    [MutationType.SET_CURRENT_USER]: (state: RootState, user: any) => {
      state.currentUser = user;
    },
    [MutationType.SET_USER_PROFILE]: (state: RootState, profile: any) => {
      state.userProfile = profile;
    },
  },
  modules: {
    comments,
    features,
    items,
    links,
    projects,
  },
  strict: debug,
});

export default store;
