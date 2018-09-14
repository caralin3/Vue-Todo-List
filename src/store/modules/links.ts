import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Link } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Link1, Link2 } from '@/store/state';

export interface LinkState {
  links: Link[];
}

const initialState: LinkState = {
  links: [Link1, Link2],
};

const actions: ActionTree<LinkState, any> = {
  addLink: ({commit}, link: Link): any => {
    commit(MutationType.ADD_LINK, link);
  },
  editLink: ({commit}, link: Link): any => {
    commit(MutationType.EDIT_LINK, link);
  },
  removeLink: ({commit}, link: Link): any => {
    commit(MutationType.REMOVE_LINK, link);
  },
  removeAllLinks: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_LINKS);
  },
};

const mutations: MutationTree<LinkState> = {
  [MutationType.ADD_LINK]: (state: LinkState, link: Link) => {
    state.links.push(link);
  },
  [MutationType.EDIT_LINK]: (state: LinkState, link: Link) => {
    state.links = [
      ...state.links.filter((c: Link) => c.id !== link.id),
      link,
    ];
  },
  [MutationType.REMOVE_LINK]: (state: LinkState, link: Link) => {
    state.links.splice(state.links.indexOf(link), 1);
  },
  [MutationType.REMOVE_ALL_LINKS]: (state: LinkState) => {
    state.links = [];
  },
};

const getters: GetterTree<LinkState, any> = {
  linkCount(state: LinkState): number {
    return state.links.length;
  },
};

export const links = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
