import { mount } from '@vue/test-utils';
import DateInput from '@/components/DateInput.vue';

describe('DateInput', () => {
  const date = new Date('2018-09-10T02:02:20');
  const wrapper: any = mount(DateInput, {
    propsData: {
      label: 'Label',
      placeholder: '',
      date,
    },
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.date).toMatchSnapshot(date.toDateString());
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
