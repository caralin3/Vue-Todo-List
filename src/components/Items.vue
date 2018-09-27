<template>
  <div class="items" :class="{'items-open': itemId}">
    <div class="items_list" :class="{'items_list-close': itemId}">
      <item-list :icon="icon" :items="itemList" />
    </div>
    <div class="items_details" :class="{'items_details-open': itemId}" v-if="itemId">
      <item-details :on-close="close" :item="currentItem"  />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import ItemDetails from '@/components/ItemDetails.vue';
import ItemList from '@/components/ItemList.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'Items',

  components: {
    ItemDetails,
    ItemList,
  },

  props: {
    icon: {
      type: String,
    },
    itemList: {
      type: Array,
    },
  },

  data: () => ({
    filter: '',
    itemId: '',
    currentItem: {} as Feature | Item,
  }),

  created(this: any) {
    this.filter = this.$route.query.filter;
    this.itemId = this.$route.query.id;
    this.getItem();
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.features,
    }),
  },

  methods: {
    getItem(this: any) {
      if (this.filter === 'features') {
        this.currentItem = this.features.filter((feature: Feature) => feature.id === this.itemId)[0];
      } else {
        this.currentItem = this.items.filter((item: Item) => item.id === this.itemId)[0];
      }
    },
    close(this: any) {
      this.$router.push({ path: this.$route.path, query: { filter: this.filter }});
    },
  },

  watch: {
    '$route.query.id'(this: any) {
      this.itemId = this.$route.query.id;
      this.getItem();
    },
  },

});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.items {

  &-open {
    display: grid;
    grid-template:
      "list details"
      ~'/' 1fr 2fr;

    @media only screen and (max-width: 780px) {
      display: flex;
    }
  }

  &_list {
    grid-area: list;

    &-close {
      @media only screen and (max-width: 780px) {
        display: none;
      }
    }
  }

  &_details {
    grid-area: details;
    padding: 2rem 2rem 2rem 0;

    @media only screen and (max-width: 780px) {
      display: none;
    }

    &-open {
      @media only screen and (max-width: 780px) {
        display: block;
        padding: 2rem 1.5rem 2rem 1rem;
      }
    }
  }
}
</style>

