import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Feature } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Feature1, Feature2, Feature3, Feature4 } from '@/store/state';

export interface FeatureState {
  features: Feature[];
}

const initialState: FeatureState = {
  features: [Feature1, Feature2, Feature3, Feature4],
};

const actions: ActionTree<FeatureState, any> = {
  addFeature: ({commit}, feature: Feature): any => {
    commit(MutationType.ADD_FEATURE, feature);
  },
  editFeature: ({commit}, feature: Feature): any => {
    commit(MutationType.EDIT_FEATURE, feature);
  },
  removeFeature: ({commit}, feature: Feature): any => {
    commit(MutationType.REMOVE_FEATURE, feature);
  },
  removeAllFeatures: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_FEATURES);
  },
};

const mutations: MutationTree<FeatureState> = {
  [MutationType.ADD_FEATURE]: (state: FeatureState, feature: Feature) => {
    state.features.push(feature);
  },
  [MutationType.EDIT_FEATURE]: (state: FeatureState, feature: Feature) => {
    state.features = [
      ...state.features.filter((f: Feature) => f.id !== feature.id),
      feature,
    ];
  },
  [MutationType.REMOVE_FEATURE]: (state: FeatureState, feature: Feature) => {
    state.features.splice(state.features.indexOf(feature), 1);
  },
  [MutationType.REMOVE_ALL_FEATURES]: (state: FeatureState) => {
    state.features = [];
  },
};

const getters: GetterTree<FeatureState, any> = {
  featureCount(state: FeatureState): number {
    return state.features.length;
  },
  // projectFeatures(state: FeatureState): number {
  //   // return state.features.length;
  //   return state.features.map((id: string) => state.features.filter());
  // },
};

export const features = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
