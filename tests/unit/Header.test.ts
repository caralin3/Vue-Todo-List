import VueRouter from 'vue-router';
import { createLocalVue, shallowMount } from '@vue/test-utils';
import Header from '@/components/Header.vue';
import store from '@/store';

describe('Header', () => {
  it('renders the correct markup', () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const wrapper: any = shallowMount(Header, {
      router: new VueRouter(),
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
