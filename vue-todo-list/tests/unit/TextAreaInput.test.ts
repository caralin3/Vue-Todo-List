import { mount } from '@vue/test-utils';
import TextAreaInput from '@/components/TextAreaInput.vue';

describe('TextAreaInput', () => {
  const text = 'TextArea Test';
  const wrapper: any = mount(TextAreaInput, {
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
