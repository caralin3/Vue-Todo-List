import { GetterTree, MutationTree, ActionTree } from 'vuex';
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
    commit(MutationType.ADD_ITEM, item);
  },
  editItem: ({commit}, item: Item): any => {
    commit(MutationType.EDIT_ITEM, item);
  },
  removeItem: ({commit}, item: Item): any => {
    commit(MutationType.REMOVE_ITEM, item);
  },
  removeAllItems: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_ITEMS);
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
