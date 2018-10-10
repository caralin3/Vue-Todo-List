import { mount } from '@vue/test-utils';
import DateInput from '@/components/DateInput.vue';

describe('DateInput', () => {
  const date = new Date('2018-09-10T02:02:20');
  const label = 'Label';
  const placeholder = '';
  const wrapper: any = mount(DateInput, {
    propsData: {
      label,
      placeholder,
      date,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.date).toMatchSnapshot(date.toDateString());
    expect(vm.label).toMatchSnapshot(label);
    expect(vm.placeholder).toMatchSnapshot(placeholder);
  });

  it('emits a change event', () => {
    vm.onChange(date);
    expect(wrapper.emitted().input[0]).toEqual([date]);
    expect(wrapper.emitted().input[0][0]).toMatchSnapshot(date.toString());
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
