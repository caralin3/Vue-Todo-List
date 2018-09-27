<template>
  <div class="itemList">
    <add-feature-dialog v-if="show" :toggleDialog="toggleDialog" />
    <div class="itemList_header">
      <button class="itemList_header-button" @click="toggleDialog">
        Add {{ buttonTitle | capitalize }}
      </button>
      <span class="itemList_header-filter">
        <select-input
          :class="'itemList_header-select'"
          rootClass="itemList_header"
          v-model="filter"
          :onBlur="() => null"
          :onFocus="() => null"
          :options="filterOptions" />
      </span>
    </div>
    <ul class="itemList_list" v-for="item in items" :key="item.id" >
      <div
        :class="{'itemList_item-selected': selected && item.id === selected.id}"
        @click="onClick(item)"
      >
        <list-item class="itemList_item" :icon="icon" :item="item" />
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import AddFeatureDialog from './AddFeatureDialog.vue';
import ListItem from './ListItem.vue';
import SelectInput from './SelectInput.vue';
import { featureFilterOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'ItemList',

  components: {
    AddFeatureDialog,
    ListItem,
    SelectInput,
  },

  props: {
    icon: {
      type: String,
    },
    items: {
      type: Array,
    },
  },

  data: () => ({
    buttonTitle: {
      default: '',
      type: String,
    },
    filter: 'Select Filter',
    selected: {
      default: {},
      type: Object,
    },
    show: false as boolean,
    filterOptions: featureFilterOptions,
  }),

  created(this: any) {
    this.buttonTitle = this.$route.query.filter.toString().slice(0, -1);
  },

  methods: {
    onClick(this: any, item: any) {
      if (this.selected && this.selected.id === item.id) {
        this.selected = {};
        this.$router.push({ path: this.$route.path, query: { filter: 'features'}});
      } else {
        this.selected = item;
        this.$router.push({ path: this.$route.path, query: { filter: 'features', id: item.id}});
      }
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.itemList {
  margin: 2rem;

  &_header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    // background-color: @medium-sea-green;
    border: 1px solid @very-light-gray;
    // box-shadow: 2px 2px 5px rgba(114, 113, 113, 0.3);
    padding: 0.5rem 1rem;

    &-button {
      .button;
      height: 2rem;
      padding: 0.5rem 1rem;
    }

    &-select {
      margin: 0;
    }
  }

  &_list {
    border-left: 1px solid @very-light-gray;
    border-right: 1px solid @very-light-gray;
  }

  &_item {
    &:hover,
    &-selected {
      background-color: fade(@medium-sea-green, 20%);
      cursor: pointer;
    }
  }
}
</style>
