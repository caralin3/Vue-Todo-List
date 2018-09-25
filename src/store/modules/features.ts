import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as firebase from 'firebase';
import * as fb from '@/firebase';
import { Feature } from '@/types';
import { MutationType } from '@/store/mutation-types';

export interface FeatureState {
  features: Feature[];
}

const initialState: FeatureState = {
  features: [],
};

const actions: ActionTree<FeatureState, any> = {
  addFeature: ({commit}, feature: Feature): any => {
    fb.featuresCollection.add(feature).then(() => {
      let newFeature: Feature;
      fb.featuresCollection.orderBy('startDate', 'desc').limit(1).get()
        .then((querySnapshot: any) => {
          newFeature = querySnapshot.docs[0].data();
          newFeature.startDate = new Date(querySnapshot.docs[0].data().startDate);
          newFeature.updatedDate = new Date(querySnapshot.docs[0].data().updatedDate);
          if (newFeature.endDate) {
            newFeature.endDate = new Date(querySnapshot.docs[0].data().endDate);
          }
          newFeature.id = querySnapshot.docs[0].id;
          console.log(newFeature);
          commit(MutationType.ADD_FEATURE, newFeature);
          fb.projectsCollection.doc(feature.projectId).update({
            updatedDate: feature.updatedDate,
            features: firebase.firestore.FieldValue.arrayUnion(newFeature.id),
          });
        });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  editFeature: ({commit}, feature: Feature): any => {
    fb.featuresCollection.doc(feature.id).update(feature).then(() => {
      const newFeature = {
        ...feature,
        startDate: new Date(feature.startDate),
        updatedDate: new Date(feature.updatedDate),
      };
      if (feature.endDate) {
        newFeature.endDate = new Date(feature.endDate);
      }
      commit(MutationType.EDIT_FEATURE, newFeature);
      fb.projectsCollection.doc(feature.projectId).update({
        updatedDate: feature.updatedDate,
      });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeFeature: ({commit}, feature: Feature): any => {
    commit(MutationType.REMOVE_FEATURE, feature);
  },
  removeAllFeatures: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_FEATURES);
  },
  setFeatures: ({commit}, feature: Feature): any => {
    commit(MutationType.SET_FEATURES, feature);
  },
};

const mutations: MutationTree<FeatureState> = {
  [MutationType.ADD_FEATURE]: (state: FeatureState, feature: Feature) => {
    state.features.push(feature);
  },
  [MutationType.EDIT_FEATURE]: (state: FeatureState, feature: Feature) => {
    state.features = [
      feature,
      ...state.features.filter((f: Feature) => f.id !== feature.id),
    ];
  },
  [MutationType.REMOVE_FEATURE]: (state: FeatureState, feature: Feature) => {
    state.features.splice(state.features.indexOf(feature), 1);
  },
  [MutationType.REMOVE_ALL_FEATURES]: (state: FeatureState) => {
    state.features = [];
  },
  [MutationType.SET_FEATURES]: (state: FeatureState, featureList: Feature[]) => {
    state.features = featureList;
  },
};

const getters: GetterTree<FeatureState, any> = {
  featureCount(state: FeatureState): number {
    return state.features.length;
  },
};

export const features = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
