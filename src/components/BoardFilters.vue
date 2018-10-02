<template>
  <div class="boardFilters">
    <h3 class="boardFilters_title">Filters</h3>
    <ul class="boardFilters_filters" v-for="(filter, index) in filters" :key="index">
      <li class="boardFilters_filter" :class="{'boardFilters_filter-active': active === filter}" @click="handleFilter(filter)">
        {{ filter }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BoardFilters',

  props: {
    filters: {
      type: Array,
    },
    onClick: {
      type: Function,
    },
  },

  data: () => ({
    active: '',
  }),

  methods: {
    handleFilter(this: any, filter: string) {
      this.onClick(this.active === filter ? '' : filter);
      this.active = this.active === filter ? '' : filter;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.boardFilters {
  align-items: center;
  color: @madison;
  display: flex;

  &_filters {
    padding-left: 2rem;

    @media only screen and (max-width: 640px) {
      padding-left: 0.5rem;

      &:nth-child(n + 5) {
        display: none;
        padding: 0;
      }
    }
  }

  &_filter {
    padding: 0.5rem;

    &-active {
      background-color: @medium-sea-green;
      color: @white;
    }

    &:focus,
    &:hover {
      background-color: @medium-sea-green;
      color: @white;
      cursor: pointer;
    }
  }
}
</style>

