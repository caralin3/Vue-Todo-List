import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Comment } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Comment1, Comment2 } from '@/store/state';

export interface CommentState {
  comments: Comment[];
}

const initialState: CommentState = {
  comments: [Comment1, Comment2],
};

const actions: ActionTree<CommentState, any> = {
  addComment: ({commit}, comment: Comment): any => {
    commit(MutationType.ADD_COMMENT, comment);
  },
  editComment: ({commit}, comment: Comment): any => {
    commit(MutationType.EDIT_COMMENT, comment);
  },
  removeComment: ({commit}, comment: Comment): any => {
    commit(MutationType.REMOVE_COMMENT, comment);
  },
  removeAllComments: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_COMMENTS);
  },
};

const mutations: MutationTree<CommentState> = {
  [MutationType.ADD_COMMENT]: (state: CommentState, comment: Comment) => {
    state.comments.push(comment);
  },
  [MutationType.EDIT_COMMENT]: (state: CommentState, comment: Comment) => {
    state.comments = [
      ...state.comments.filter((c: Comment) => c.id !== comment.id),
      comment,
    ];
  },
  [MutationType.REMOVE_COMMENT]: (state: CommentState, comment: Comment) => {
    state.comments.splice(state.comments.indexOf(comment), 1);
  },
  [MutationType.REMOVE_ALL_COMMENTS]: (state: CommentState) => {
    state.comments = [];
  },
};

const getters: GetterTree<CommentState, any> = {
  commentCount(state: CommentState): number {
    return state.comments.length;
  },
};

export const comments = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
