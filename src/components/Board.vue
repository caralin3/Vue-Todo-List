<template>
  <div class="board">
    <div class="board_header">
      <h2 class="board_title">{{ filter | capitalize }}</h2>
      <board-icon />
    </div>
    <div class="board_filters">
      Filters
    </div>
    <div class="board_board">
      Board
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import BoardIcon from './BoardIcon.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'Board',

  components: {
    BoardIcon,
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

.board {
  &_header {
    align-items: center;
    display: flex;
    grid-area: header;
    padding: 2rem 2rem 0;
  }

  &_title {
    margin: 0;
  }

  &_filters {
    padding: 2rem;
  }

  &_board {
    padding: 2rem;
  }
}
</style>

