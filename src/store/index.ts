import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import * as fb from '@/firebaseConfig';
import { comments } from './modules/comments';
import { features } from './modules/features';
import { items } from './modules/items';
import { links } from './modules/links';
import { projects } from './modules/projects';
import { MutationType } from './mutation-types';
import { RootState } from './types';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

// Handle page reload
fb.auth.onAuthStateChanged((user: any) => {
  if (user) {
    fb.usersCollection.doc(user.uid).get()
      .then((curr: any) => {
        const currentUser = {
          email: curr.data().email,
          first: curr.data().firstName,
          id: curr.id,
          last: curr.data().lastName,
        };
        store.commit(MutationType.SET_CURRENT_USER, currentUser);
        store.commit(MutationType.SET_USER_PROFILE, currentUser);
      });

    fb.usersCollection.doc(user.uid).onSnapshot((doc: any) => {
      store.commit(MutationType.SET_USER_PROFILE, doc.data());
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
          console.log(err);
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
