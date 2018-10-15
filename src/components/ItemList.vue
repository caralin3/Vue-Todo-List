<template>
  <div class="itemList">
    <add-feature-dialog
      v-if="show.add && buttonTitle === 'feature'"
      :toggle-dialog="() => toggleDialog('add')"
    />
    <add-item-dialog
      v-if="show.add && buttonTitle !== 'feature'"
      :toggle-dialog="() => toggleDialog('add')"
    />
    <sort-dialog
      v-if="show.sort"
      :toggle-dialog="() => toggleDialog('sort')"
      :on-submit="sort"
    />
    <filter-dialog
      v-if="show.filter"
      :toggle-dialog="() => toggleDialog('filter')"
      :on-submit="setFilter"
    />
    <div class="itemList_header">
      <span class="itemList_header-leftButtons">
        <button
          class="itemList_header-button itemList_header-button-left itemList_header-button-sort"
          @click="toggleDialog('sort')"
          @contextmenu.prevent="() => sortOption = {}"
          @mousedown="start"
          @mouseup="end"
          @mouseout="end"
        >
          <span v-if="sortOption.text">
            Sorted By: {{sortOption.text}}
          </span>
          <span v-else>Sort</span>
        </button>
        <button class="itemList_header-button itemList_header-button-left" @click="toggleDialog('filter')">
          Filter
        </button>
        <span class="itemList_header-filters">
          <span
            class="itemList_header-filter"
            v-if="filters" v-for="filter in filters" :key="filter.id"
            @contextmenu.prevent="() => removeFilter(filter.field)"
          >
            <span v-if="filter.field === 'assignee'">
              <strong class="itemList_header-filters-label">Assignee:</strong> {{ filteredUser | name }}
            </span>
            <span v-else>
              <strong class="itemList_header-filters-label">{{ filter.field | capitalize }}:</strong> {{ filter.value | capitalize }}
            </span>
          </span>
        </span>
      </span>
      <button class="itemList_header-button" @click="toggleDialog('add')">
        Add {{ buttonTitle | capitalize }}
      </button>
    </div>
    <ul class="itemList_list" v-for="item in sortedItems" :key="item.id" >
      <div
        :class="{'itemList_item-selected': selected && item.id === selected.id}"
        @click="onClick(item)"
      >
        <list-item
          class="itemList_item"
          :item="item"
          :icon="buttonTitle === 'feature' ? 'feature' : item.type"
        />
      </div>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import AddFeatureDialog from './AddFeatureDialog.vue';
import AddItemDialog from './AddItemDialog.vue';
import FilterDialog from './FilterDialog.vue';
import ListItem from './ListItem.vue';
import SortDialog from './SortDialog.vue';
import { featureFilterOptions, userOptions } from '@/utils/constants';
import { Feature, Item, User } from '@/types';

export default Vue.extend({
  name: 'ItemList',

  components: {
    AddFeatureDialog,
    AddItemDialog,
    FilterDialog,
    ListItem,
    SortDialog,
  },

  props: {
    itemList: {
      type: Array,
    },
  },

  data: () => ({
    buttonTitle: {
      default: '',
      type: String,
    },
    filters: {},
    selected: {
      default: {},
      type: Object,
    },
    show: {
      add: false,
      sort: false,
      filter: false,
    },
    sortOption: {},
    timer: 0,
  }),

  created(this: any) {
    if (this.$route.query.filter) {
      this.buttonTitle = this.$route.query.filter.toString().slice(0, -1);
    }
    if (this.buttonTitle === 'feature' && this.$route.query.id) {
      this.selected = this.features.filter((f: Feature) => f.id === this.$route.query.id)[0];
    } else if (this.$route.query.id) {
      this.selected = this.items.filter((i: Item) => i.id === this.$route.query.id)[0];
    }
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
    }),
    filteredUser(this: any) {
      if (this.filters.length > 0) {
        const userId = this.filters.filter((filter: any) => filter.field === 'assignee')[0].value;
        if (userId) {
          return userOptions.filter((user: User) => user.id === userId)[0];
        }
      }
    },
    filteredItems(this: any) {
      if (this.filters.length > 0) {
        const filtered: Item[] | Feature[] = this.itemList.filter((item: Item |Feature) => {
          return this.filters.every((filter: any) => filter.condition(item));
        });
        return filtered;
      }
      return this.itemList;
    },
    sortedItems(this: any) {
      if (this.sortOption.id) {
        if (this.sortOption.dir === 'asc') {
          return this.filteredItems.sort((a: any, b: any) => {
            if (a[this.sortOption.id] < b[this.sortOption.id]) {
              return -1;
            }
            if (a[this.sortOption.id] > b[this.sortOption.id]) {
              return 1;
            }
            return 0;
          });
        } else {
          return this.filteredItems.sort((a: any, b: any) => {
            if (a[this.sortOption.id] > b[this.sortOption.id]) {
              return -1;
            }
            if (a[this.sortOption.id] < b[this.sortOption.id]) {
              return 1;
            }
            return 0;
          });
        }
      }
      return this.filteredItems.sort((item1: Item | Feature, item2: Item | Feature) => {
        if (item1.updatedDate > item2.updatedDate) {
          return -1;
        }
        if (item1.updatedDate < item2.updatedDate) {
          return 1;
        }
        return 0;
      });
    },
  },

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
    toggleDialog(this: any, key: string) {
      this.show[key] = !this.show[key];
    },
    sort(this: any, sort: any) {
      this.sortOption = sort;
    },
    setFilter(this: any, conditions: (item: Item | Feature) => void[]) {
      this.filters = conditions;
    },
    removeFilter(this: any, field: string) {
      this.filters = this.filters.filter((f: any) => f.field !== field);
    },
    start(this: any) {
      setInterval(this.timer++, 20);
    },
    end(this: any) {
      if (this.timer > 3) {
        this.sortOption = {};
      }
    },
  },

  watch: {
    '$route.query.id'(this: any) {
      if (!this.$route.query.id) {
        this.selected = {};
      }
    },
    '$route.query.filter'(this: any) {
      if (this.$route.query.filter) {
        this.buttonTitle = this.$route.query.filter.toString().slice(0, -1);
        this.filters = [];
        this.sortOption = {};
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.itemList {
  padding: 2rem;

  &_header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    border: 1px solid @very-light-gray;
    padding: 0.5rem 1rem;

    &-filters {
      @media only screen and (max-width: 860px) {
        display: none;
      }

      &-label {
        @media only screen and (max-width: 1130px) {
          display: none;
        }
      }
    }

    &-filter {
      background-color: @very-light-gray;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      margin: 0 0.5rem 0 0;
      padding: 0.3rem 0.5rem;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    &-button {
      .button;
      padding: 0.5rem 1rem;

      &-left {
        margin: 0 0.5rem 0 0;
        max-width: none;
      }
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
