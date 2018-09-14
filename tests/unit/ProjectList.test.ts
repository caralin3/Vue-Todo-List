import { mount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';

describe('TextInput', () => {
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
