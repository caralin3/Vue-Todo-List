import Vue from 'vue';
import Vuex from 'vuex';
import { projects } from '@/store/modules/projects';
import { todo } from '@/store/modules/todo';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects,
    todo,
  },
  strict: debug,
});
