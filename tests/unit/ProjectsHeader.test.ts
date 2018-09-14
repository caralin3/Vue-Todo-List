// import Vuex from 'vuex';
// import { shallowMount, createLocalVue } from '@vue/test-utils';
// import ProjectsHeader from '@/components/ProjectsHeader.vue';
// import { projects } from '@/store/modules/projects';

// const localVue = createLocalVue();

// localVue.use(Vuex);

// describe('ProjectsHeader', () => {
//   let actions;
//   let state;
//   let store;

//   beforeEach(() => {
//     actions = {
//       addProject: jest.fn(),
//       removeProject: jest.fn(),
//     },

//     store = new Vuex.Store({
//       modules: {
//         projects: {
//           state: projects.state,
//           actions,
//           getters: projects.getters,
//         },
//       },
//     });
//   });

//   const toggleDialog = () => null;
//   const wrapper: any = shallowMount(ProjectsHeader, {
//     store,
//     localVue,
//     propsData: {
//       toggleDialog,
//     },
//   });
//   it('renders the correct markup', () => {
//     expect(wrapper.element).toMatchSnapshot();
//   });
// });

import { mount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';

describe('ProjectsHeader', () => {
  const text = 'Text Input Test';
  const wrapper: any = mount(TextInput, {
    propsData: {
      label: 'Label',
      placeholder: '',
      text,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.text).toMatchSnapshot(text);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
