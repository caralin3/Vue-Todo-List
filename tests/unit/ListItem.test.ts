import { createLocalVue, mount } from '@vue/test-utils';
import VueRouter from 'vue-router';
import ListItem from '@/components/ListItem.vue';
import BugIcon from '@/components/BugIcon.vue';
import ComponentIcon from '@/components/ComponentIcon.vue';
import FeatureIcon from '@/components/FeatureIcon.vue';
import PriorityIcon from '@/components/PriorityIcon.vue';
import StatusIcon from '@/components/StatusIcon.vue';
import TaskIcon from '@/components/TaskIcon.vue';
import { Item1 } from '@/store/state';
import '@/utils/filters';

describe('ListItem', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);

  const icon: string = 'bug';
  const item = Item1;

  const wrapper: any = mount(ListItem, {
    components: {
      BugIcon,
      ComponentIcon,
      FeatureIcon,
      PriorityIcon,
      StatusIcon,
      TaskIcon,
    },
    propsData: {
      icon,
      item,
    },
    router: new VueRouter(),
    localVue,
  });
  const vm: any = wrapper.vm;

  it('receives the correct props', () => {
    expect(vm.icon).toMatchSnapshot(icon);
  });

  it('renders the correct markup', () => {
    expect(wrapper.element).toMatchSnapshot();
  });
});
