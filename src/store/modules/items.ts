import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as firebase from 'firebase';
import * as fb from '@/firebase';
import { Item } from '@/types';
import { MutationType } from '@/store/mutation-types';

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

const actions: ActionTree<ItemState, any> = {
  addItem: ({commit}, item: Item): any => {
    fb.itemsCollection.add(item).then(() => {
      let newItem: Item;
      fb.itemsCollection.orderBy('startDate', 'desc').limit(1).get()
        .then((querySnapshot: any) => {
          newItem = querySnapshot.docs[0].data();
          newItem.startDate = new Date(querySnapshot.docs[0].data().startDate);
          newItem.updatedDate = new Date(querySnapshot.docs[0].data().updatedDate);
          if (newItem.endDate) {
            newItem.endDate = new Date(querySnapshot.docs[0].data().endDate);
          }
          newItem.id = querySnapshot.docs[0].id;
          commit(MutationType.ADD_ITEM, newItem);
          fb.featuresCollection.doc(item.featureId).update({
            updatedDate: item.updatedDate,
            items: firebase.firestore.FieldValue.arrayUnion(newItem.id),
          });
        });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  editItem: ({commit}, item: Item): any => {
    fb.itemsCollection.doc(item.id).update(item).then(() => {
      const newItem = {
        ...item,
        startDate: new Date(item.startDate),
        updatedDate: new Date(item.updatedDate),
      };
      if (item.endDate) {
        newItem.endDate = new Date(item.endDate);
      }
      commit(MutationType.EDIT_ITEM, item);
      fb.featuresCollection.doc(item.featureId).update({
        updatedDate: item.updatedDate,
      });
    }).catch((err: any) => {
      console.log(err.message);
    });
  },
  removeItem: ({commit}, item: Item): any => {
    // TODO: Remove from Firebase
    commit(MutationType.REMOVE_ITEM, item);
  },
  removeAllItems: ({commit}): any => {
    // TODO: Remove from Firebase
    commit(MutationType.REMOVE_ALL_ITEMS);
  },
  setItems: ({commit}, item: Item): any => {
    commit(MutationType.SET_FEATURES, item);
  },
};

const mutations: MutationTree<ItemState> = {
  [MutationType.ADD_ITEM]: (state: ItemState, item: Item) => {
    state.items.push(item);
  },
  [MutationType.EDIT_ITEM]: (state: ItemState, item: Item) => {
    state.items = [
      ...state.items.filter((i: Item) => i.id !== item.id),
      item,
    ];
  },
  [MutationType.REMOVE_ITEM]: (state: ItemState, item: Item) => {
    state.items.splice(state.items.indexOf(item), 1);
  },
  [MutationType.REMOVE_ALL_ITEMS]: (state: ItemState) => {
    state.items = [];
  },
  [MutationType.SET_ITEMS]: (state: ItemState, itemList: Item[]) => {
    state.items = itemList;
  },
};

const getters: GetterTree<ItemState, any> = {
  itemCount(state: ItemState): number {
    return state.items.length;
  },
};

export const items = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
