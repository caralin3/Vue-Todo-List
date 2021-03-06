<template>
  <div class="items" :class="{'items-open': itemId}">
    <div class="items_header">
      <h2 class="items_title">{{ filter | capitalize }}</h2>
      <feature-icon v-if="filter === 'features'" />
      <item-icon v-if="filter === 'items'" />
    </div>
    <div class="items_list" :class="{'items_list-close': itemId}">
      <item-list :item-list="itemList" />
    </div>
    <div class="items_details" :class="{'items_details-open': itemId}" v-if="itemId">
      <item-details
        :comments="featureComments"
        :feature="feature"
        :featureItems="featureItems"
        :item="currentItem"
        :links="featureLinks"
        :on-close="close"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import FeatureIcon from './FeatureIcon.vue';
import ItemDetails from '@/components/ItemDetails.vue';
import ItemIcon from './ItemIcon.vue';
import ItemList from '@/components/ItemList.vue';
import { Comment, Feature, Item, Link } from '@/types';

export default Vue.extend({
  name: 'Items',

  components: {
    FeatureIcon,
    ItemDetails,
    ItemIcon,
    ItemList,
  },

  props: {
    itemList: {
      type: Array,
    },
  },

  data: () => ({
    filter: '',
    itemId: '',
  }),

  created(this: any) {
    this.filter = this.$route.query.filter;
    this.itemId = this.$route.query.id;
  },

  computed: {
    ...mapState({
      comments: (state: any) => state.comments.comments,
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
      links: (state: any) => state.links.links,
    }),
    currentItem(this: any) {
      if (this.filter === 'features') {
        if (this.features && this.features.length > 0) {
          return this.features.filter((feature: Feature) => feature.id === this.itemId)[0];
        }
      } else if (this.filter === 'items') {
        if (this.items && this.items.length > 0) {
          return this.items.filter((item: Item) => item.id === this.itemId)[0];
        }
      }
    },
    feature(this: any) {
      if (this.itemId) {
        return this.features.filter((f: Feature) => f.id === this.currentItem.featureId)[0];
      }
    },
    featureItems(this: any) {
      if (this.itemId) {
        return this.items.filter((i: Item) => i.featureId === this.currentItem.id);
      }
    },
    featureLinks(this: any) {
      if (this.itemId) {
        if (this.filter === 'features') {
          return this.links.filter((l: Link) => l.featureId === this.currentItem.id);
        } else if (this.filter === 'items') {
          return this.links.filter((l: Link) => l.itemId === this.currentItem.id);
        }
      }
    },
    featureComments(this: any) {
      if (this.itemId) {
        if (this.filter === 'features') {
          return this.comments.filter((c: Comment) => c.featureId === this.currentItem.id);
        } else if (this.filter === 'items') {
          return this.comments.filter((c: Comment) => c.itemId === this.currentItem.id);
        }
      }
    },
  },

  methods: {
    close(this: any) {
      this.$router.push({ path: this.$route.path, query: { filter: this.filter }});
    },
  },

  watch: {
    '$route.query.id'(this: any) {
      this.itemId = this.$route.query.id;
    },
    '$route.query.filter'(this: any) {
      this.filter = this.$route.query.filter;
    },
  },

});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.items {
  &_header {
    align-items: center;
    display: flex;
    grid-area: header;
    padding: 2rem 2rem 0;
  }

  &_title {
    margin: 0;
  }

  &-open {
    display: grid;
    grid-template:
      "header header"
      "list details"
      ~'/' 1fr 2fr;

    @media only screen and (max-width: 780px) {
      display: flex;
      flex-direction: column;
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

