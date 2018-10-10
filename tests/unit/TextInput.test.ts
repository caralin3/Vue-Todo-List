import { mount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';

describe('TextInput', () => {
  const text: string = 'Text Input Test';
  const label: string = 'Label';
  const placeholder: string = '';
  const wrapper: any = mount(TextInput, {
    propsData: {
      label,
      placeholder,
      text,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.text).toMatchSnapshot(text);
    expect(vm.label).toMatchSnapshot(label);
    expect(vm.placeholder).toMatchSnapshot(placeholder);
  });

  it('emits a change event', () => {
    vm.onChange(text);
    expect(wrapper.emitted().input[0]).toEqual([text]);
    expect(wrapper.emitted().input[0][0]).toMatchSnapshot(text);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
