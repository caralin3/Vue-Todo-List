import { mount } from '@vue/test-utils';
import SelectUserInput from '@/components/SelectUserInput.vue';
import { getUserOptions } from '@/utils/constants';
import { User } from '@/types';
import '@/utils/filters';

describe('SelectUserInput', () => {
  const label: string = 'Label';
  const value: string = 'Selected Value';
  const options: User[] = getUserOptions();
  const wrapper: any = mount(SelectUserInput, {
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
