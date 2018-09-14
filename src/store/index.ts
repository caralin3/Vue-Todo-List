import Vue from 'vue';
import Vuex from 'vuex';
import { comments } from '@/store/modules/comments';
import { features } from '@/store/modules/features';
import { items } from '@/store/modules/items';
import { links } from '@/store/modules/links';
import { projects } from '@/store/modules/projects';

const debug = process.env.NODE_ENV !== 'production';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    comments,
    features,
    items,
    links,
    projects,
  },
  strict: debug,
});
