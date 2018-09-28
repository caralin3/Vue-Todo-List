<template>
  <div class="activityList">
    <div class="activityList_header">
      <!-- <button class="activityList_header-button" @click="toggleDialog">
        Add {{ buttonTitle | capitalize }}
      </button> -->
      <span class="activityList_header-filter">
        <select-input
          class="activityList_header-select"
          rootClass="activityList_header"
          v-model="filter"
          :onBlur="() => null"
          :onFocus="() => null"
          :options="filterOptions"
        />
      </span>
    </div>
    <ul class="activityList_list" v-for="item in items" :key="item.id" >
      <div
        :class="{'activityList_item-selected': selected && item.id === selected.id}"
        @click="onClick(item)"
      >
        <list-item
          class="activityList_item"
          :item="item"
          icon="feature"
        />
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ListItem from './ListItem.vue';
import SelectInput from './SelectInput.vue';
import { featureFilterOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'ActivityList',

  components: {
    ListItem,
    SelectInput,
  },

  props: {
    items: {
      type: Array,
    },
  },

  data: () => ({
    filter: 'Select Filter',
    filterOptions: featureFilterOptions,
    selected: {
      default: {},
      type: Object,
    },
    show: false as boolean,
  }),

  // created(this: any) {},

  methods: {
    onClick(this: any, item: any) {
      const filter = this.$route.query.filter;
      if (this.selected && this.selected.id === item.id) {
        this.$router.push({ path: this.$route.path, query: { filter }});
        this.selected = {};
      } else {
        this.selected = item;
        this.$router.push({ path: this.$route.path, query: { filter, id: item.id}});
      }
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },

  watch: {
    '$route.query.id'(this: any) {
      if (!this.$route.query.id) {
        this.selected = {};
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.activityList {
  padding: 2rem;

  &_header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    // background-color: @medium-sea-green;
    border: 1px solid @very-light-gray;
    // box-shadow: 2px 2px 5px rgba(114, 113, 113, 0.3);
    padding: 0.5rem 1rem;

    // &-button {
    //   .button;
    //   height: 2rem;
    //   padding: 0.5rem 1rem;
    // }

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
