import { GetterTree, MutationTree, ActionTree } from 'vuex';
import { Item } from '@/types';
import { MutationType } from '@/store/mutation-types';
import { Item1 } from '@/store/state';

export interface TodoState {
  todos: Item[];
}

const initialState: TodoState = {
  todos: [Item1],
};

const actions: ActionTree<TodoState, any> = {
  addTodo: ({commit}, item: Item): any => {
    commit(MutationType.ADD_TODO, item);
  },
  removeTodo: ({commit}, item): any => {
    commit(MutationType.REMOVE_TODO, item);
  },
  removeAllTodos: ({commit}): any => {
    commit(MutationType.REMOVE_ALL_TODOS);
  },
};

const mutations: MutationTree<TodoState> = {
  [MutationType.ADD_TODO]: (state: TodoState, item: Item) => {
    state.todos.push(item);
  },
  [MutationType.EDIT_TODO]: (state: TodoState, item: Item) => {
    state.todos.push(item);
  },
  [MutationType.REMOVE_TODO]: (state: TodoState, item: Item) => {
    state.todos.splice(parseInt(item.id, 10), 1);
  },
  [MutationType.REMOVE_ALL_TODOS]: (state: TodoState) => {
    state.todos = [];
  },
};

const getters: GetterTree<TodoState, any> = {
  todoCount(state: TodoState): number {
    return state.todos.length;
  },
};

export const todo = {
  namespaced: true,
  state: initialState,
  actions,
  mutations,
  getters,
};
