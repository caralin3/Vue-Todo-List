import Vue from 'vue';
import VueRouter from 'vue-router';
import { config, createLocalVue, shallowMount } from '@vue/test-utils';
import Items from '@/components/Items.vue';
import store from '@/store';
import { router } from '@/router';

config.logModifiedComponents = false;

Vue.filter('capitalize', (value: string) => {
  if (value) {
    return value;
  }
});

describe('Items', () => {
  it('renders the correct markup', () => {
    const localVue = createLocalVue();
    const vueRouter = new VueRouter(router.routes);
    const filter: string = 'features';
    const id: string = 'id';

    localVue.use(VueRouter);
    const wrapper: any = shallowMount(Items, {
      router: vueRouter,
      store,
      localVue,
    });

    vueRouter.push({path: '/projects/id', query: { filter, id }});

    expect(wrapper.element).toMatchSnapshot();
  });
});
