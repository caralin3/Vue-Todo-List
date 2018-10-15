import Vue from 'vue';
import VueRouter from 'vue-router';
import { config, createLocalVue, mount, shallowMount } from '@vue/test-utils';
import ItemList from '@/components/ItemList.vue';
import AddFeatureDialog from '@/components/AddFeatureDialog.vue';
import AddItemDialog from '@/components/AddItemDialog.vue';
import ListItem from '@/components/ListItem.vue';
import { Item } from '@/types';

config.logModifiedComponents = false;

Vue.filter('capitalize', (value: string) => {
  if (value) {
    return value;
  }
});

describe('ItemList', () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);

  const itemList: Item[] = [];

  const globalWrapper: any = mount(ItemList, {
    components: {
      AddFeatureDialog,
      AddItemDialog,
      ListItem,
    },
    propsData: {
      itemList,
    },
    router: new VueRouter(),
    localVue,
  });

  it('renders the correct markup', () => {
    expect(globalWrapper.element).toMatchSnapshot();
  });

  it('triggers button to toggle dialog', () => {
    const vm: any = globalWrapper.vm;
    globalWrapper.find('button').trigger('click');
    expect(vm.show).toMatchSnapshot('true');
  });

  it('renders a button title from query filter', () => {
    const filter: string = 'features';
    const wrapper = shallowMount(ItemList, {
      mocks: {
        $route: {
          query: { filter },
        },
      },
      data: () => ({
        filteredItems: itemList,
      }),
    });
    const vm: any = wrapper.vm;

    expect(vm.buttonTitle).toMatchSnapshot(filter);
  });
});
