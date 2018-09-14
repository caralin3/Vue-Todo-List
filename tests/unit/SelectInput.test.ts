import { mount } from '@vue/test-utils';
import SelectInput from '@/components/SelectInput.vue';
import { statusOptions } from '@/utils/constants';
import '@/utils/filters';

describe('SelectInput', () => {
  const value = 'Selected Value';
  const options = statusOptions;
  const wrapper: any = mount(SelectInput, {
    propsData: {
      label: 'Label',
      options,
      value,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.value).toMatchSnapshot(value);
    expect(vm.options).toMatchSnapshot(expect.arrayContaining(options));
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
