import { mount } from '@vue/test-utils';
import PasswordInput from '@/components/PasswordInput.vue';

describe('PasswordInput', () => {
  const password: string = 'Text Input Test';
  const label: string = 'Label';
  const placeholder = '';
  const wrapper: any = mount(PasswordInput, {
    propsData: {
      label,
      placeholder,
      password,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.text).toMatchSnapshot(password);
    expect(vm.label).toMatchSnapshot(label);
    expect(vm.placeholder).toMatchSnapshot(placeholder);
  });

  it('emits a change event', () => {
    const text = 'Test';
    vm.onChange(text);
    expect(wrapper.emitted().input[0]).toEqual([text]);
    expect(wrapper.emitted().input[0][0]).toMatchSnapshot(text);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
