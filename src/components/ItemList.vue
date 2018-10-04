<template>
  <div class="itemList">
    <add-feature-dialog v-if="show && buttonTitle === 'feature'" :toggleDialog="toggleDialog" />
    <add-item-dialog v-if="show && buttonTitle !== 'feature'" :toggleDialog="toggleDialog" />
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
          :options="filterOptions"
        />
      </span>
    </div>
    <ul class="itemList_list" v-for="item in itemList" :key="item.id" >
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
import ListItem from './ListItem.vue';
import SelectInput from './SelectInput.vue';
import { featureFilterOptions } from '@/utils/constants';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'ItemList',

  components: {
    AddFeatureDialog,
    AddItemDialog,
    ListItem,
    SelectInput,
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
    filter: 'Select Filter',
    filterOptions: featureFilterOptions,
    selected: {
      default: {},
      type: Object,
    },
    show: false as boolean,
  }),

  created(this: any) {
    this.buttonTitle = this.$route.query.filter.toString().slice(0, -1);
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
    '$route.query.filter'(this: any) {
      this.buttonTitle = this.$route.query.filter.toString().slice(0, -1);
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
