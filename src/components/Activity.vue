<template>
  <div class="activity" :class="{'activity-open': itemId}">
    <div class="activity_header">
      <h2 class="activity_title">{{ filter | capitalize }}</h2>
      <activity-icon />
    </div>
    <div class="activity_list" :class="{'activity_list-close': itemId}">
      <activity-list :activity="itemList" />
    </div>
    <div class="activity_details" :class="{'activity_details-open': itemId}" v-if="itemId">
      <item-details :on-close="close" :item="currentItem"  />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import ActivityIcon from './ActivityIcon.vue';
import ActivityList from './ActivityList.vue';
import FeatureIcon from './FeatureIcon.vue';
import ItemDetails from './ItemDetails.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'Activity',

  components: {
    ActivityIcon,
    ActivityList,
    FeatureIcon,
    ItemDetails,
  },

  props: {
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
      items: (state: any) => state.items.items,
    }),
  },

  methods: {
    getItem(this: any) {
      if (this.filter === 'features') {
        if (this.features && this.features.length > 0) {
          this.currentItem = this.features.filter((feature: Feature) => feature.id === this.itemId)[0];
        }
      } else {
        if (this.items && this.items.length > 0) {
          this.currentItem = this.items.filter((item: Item) => item.id === this.itemId)[0];
        }
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
    '$route.query.filter'(this: any) {
      this.filter = this.$route.query.filter;
    },
  },

});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.activity {
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

