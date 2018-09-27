<template>
  <div class="items" :class="{'items-open': itemId}">
    <div class="items_list">
      <item-list :icon="icon" :items="itemList" />
    </div>
    <div class="items_details" v-if="itemId">
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
  }

  &_list {
    grid-area: list;
  }

  &_details {
    padding: 2rem 1rem 2rem 0;
    grid-area: details;
  }
  
}
</style>

