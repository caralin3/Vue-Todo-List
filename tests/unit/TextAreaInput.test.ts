import { mount } from '@vue/test-utils';
import TextAreaInput from '@/components/TextAreaInput.vue';

describe('TextAreaInput', () => {
  const text: string = 'TextArea Test';
  const label: string = 'Label';
  const placeholder: string = '';
  const wrapper: any = mount(TextAreaInput, {
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
