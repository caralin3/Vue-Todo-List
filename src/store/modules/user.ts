import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as fb from '@/firebaseConfig';
import { MutationType } from '@/store/mutation-types';

export interface UserState {
  currentUser: any;
  profile: object;
}

const initialState: UserState = {
  currentUser: null,
  profile: {},
};

const actions: ActionTree<UserState, any> = {
  resetData({commit}, state: UserState) {
    commit(MutationType.RESET_DATA, state);
  },
  setCurrentUser({commit}, state: UserState) {
    commit(MutationType.SET_CURRENT_USER, state);
  },
  setUserProfile({commit}, state: UserState) {
    commit(MutationType.SET_USER_PROFILE, state);
  },
  fetchUserProfile({commit}, state: UserState) {
    fb.usersCollection.doc(state.currentUser.uid).get()
      .then((userProfile: any) => {
        commit(MutationType.SET_USER_PROFILE, userProfile.data());
      }).catch((err: any) => {
        console.log(err);
      });
  },
};

const mutations: MutationTree<UserState> = {
  [MutationType.RESET_DATA]: (state: UserState) => {
    state.currentUser = null;
    state.profile = {};
  },
  [MutationType.SET_CURRENT_USER]: (state: UserState, currentUser: any) => {
    state.currentUser = currentUser;
  },
  [MutationType.SET_USER_PROFILE]: (state: UserState, profile: any) => {
    state.profile = profile;
  },
};

const getters: GetterTree<UserState, any> = {
  // commentCount(state: UserState): number {
  //   return state.comments.length;
  // },
};

export const user = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
