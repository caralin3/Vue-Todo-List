import VueRouter from 'vue-router';
import { createLocalVue, mount } from '@vue/test-utils';
import ProjectList from '@/components/ProjectList.vue';
import store from '@/store';

describe('ProjectList', () => {
  it('renders the correct markup', () => {
    const localVue = createLocalVue();
    localVue.use(VueRouter);
    const wrapper: any = mount(ProjectList, {
      router: new VueRouter(),
      store,
      localVue,
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
