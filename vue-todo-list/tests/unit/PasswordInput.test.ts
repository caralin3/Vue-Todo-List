import { mount } from '@vue/test-utils';
import PasswordInput from '@/components/PasswordInput.vue';

describe('PasswordInput', () => {
  const password = 'Text Input Test';
  const wrapper: any = mount(PasswordInput, {
    propsData: {
      label: 'Label',
      placeholder: '',
      password,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.text).toMatchSnapshot(password);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
