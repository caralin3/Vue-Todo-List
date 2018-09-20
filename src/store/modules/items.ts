import { GetterTree, MutationTree, ActionTree } from 'vuex';
import * as firebase from 'firebase';
import * as fb from '@/firebase';
import { Item } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Item1, Item2, Item3 } from '@/store/state';

export interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [Item1, Item2, Item3],
};

const actions: ActionTree<ItemState, any> = {
  addItem: ({commit}, item: Item): any => {
    fb.itemsCollection.add(item).then(() => {
      let newItem: Item;
      fb.itemsCollection.orderBy('startDate', 'asc')
        .onSnapshot((querySnapshot: any) => {
          querySnapshot.forEach((doc: any) => {
            newItem = doc.data();
            newItem.startDate = new Date(doc.data().startDate);
            newItem.updatedDate = new Date(doc.data().updatedDate);
            if (newItem.endDate) {
              newItem.endDate = new Date(doc.data().endDate);
            }
            newItem.id = doc.id;
          });
          commit(MutationType.ADD_ITEM, item);
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
    commit(MutationType.REMOVE_ITEM, item);
  },
  removeAllItems: ({commit}): any => {
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
