import { mount } from '@vue/test-utils';
import TextInput from '@/components/TextInput.vue';

describe('Form', () => {
  const buttonText: string = 'Test Button';
  const submit = jest.fn();
  const toggleDialog = jest.fn();
  const wrapper: any = mount(TextInput, {
    propsData: {
      buttonText,
      submit,
      toggleDialog,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.buttonText).toMatchSnapshot(buttonText);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
