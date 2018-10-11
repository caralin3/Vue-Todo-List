import { mount } from '@vue/test-utils';
import SelectInput from '@/components/SelectInput.vue';
import { statusOptions } from '@/utils/constants';
import '@/utils/filters';

describe('SelectInput', () => {
  const label: string = 'Label';
  const value: string = 'Selected Value';
  const options = statusOptions;
  const wrapper: any = mount(SelectInput, {
    propsData: {
      label,
      options,
      value,
      onBlur: () => null,
      onFocus: () => null,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.label).toMatchSnapshot(label);
    expect(vm.value).toMatchSnapshot(value);
    expect(vm.options).toMatchSnapshot(expect.arrayContaining(options));
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
