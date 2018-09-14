import { mount } from '@vue/test-utils';
import Dialog from '@/components/Dialog.vue';

describe('Dialog', () => {
  const title = 'Test Title';
  const toggleDialog = jest.fn();
  const wrapper: any = mount(Dialog, {
    propsData: {
      title,
      toggleDialog,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.title).toMatchSnapshot(title);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
