<template>
  <div class="board">
    <div class="board_header">
      <h2 class="board_title">{{ filter | capitalize }}</h2>
      <board-icon />
    </div>
    <div class="board_filters">
      <board-filters :filters="filters" :on-click="sort" />
    </div>
    <div class="board_board">
      <board-status-header :statuses="statuses" />
      <board-grid
        :item-list="sortBy === 'Blocker' ? blockers :
        sortBy === 'Critical' ? critical :
        sortBy === 'Major' ? major :
        sortBy === 'Minor' ? minor :
        sortBy === 'Only My Items' ? myItems :
        sortBy === 'Recently Updared' ? recentItems :
        itemList"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import BoardFilters from './BoardFilters.vue';
import BoardGrid from './BoardGrid.vue';
import BoardIcon from './BoardIcon.vue';
import BoardStatusHeader from './BoardStatusHeader.vue';
import { Feature, Item, RootState } from '@/types';

export default Vue.extend({
  name: 'Board',

  components: {
    BoardFilters,
    BoardGrid,
    BoardIcon,
    BoardStatusHeader,
  },

  props: {
    itemList: {
      type: Array,
    },
  },

  data: () => ({
    filter: '',
    filters: [],
    itemId: '',
    currentItem: {} as Feature | Item,
    sorted: [],
    sortBy: '',
  }),

  created(this: any) {
    this.filter = this.$route.query.filter;
    this.itemId = this.$route.query.id;
    this.sorted = this.itemList;
    this.getItem();

    this.filters = [
      'Blocker',
      'Critical',
      'Major',
      'Minor',
      'Only My Items',
      'Recently Updated',
    ];
  },

  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
    }),
    todoCount(this: any) {
      return this.itemList.filter((item: any) => item.status === 'todo').length;
    },
    progressCount(this: any) {
      return this.itemList.filter((item: any) => item.status === 'inProgress').length;
    },
    completedCount(this: any) {
      return this.itemList.filter((item: any) => item.status === 'completed').length;
    },
    closedCount(this: any) {
      return this.itemList.filter((item: any) => item.status === 'closed').length;
    },
    blockers(this: any) {
      return this.itemList.filter((item: any) => item.priority === 'blocker');
    },
    critical(this: any) {
      return this.itemList.filter((item: any) => item.priority === 'critical');
    },
    major(this: any) {
      return this.itemList.filter((item: any) => item.priority === 'major');
    },
    minor(this: any) {
      return this.itemList.filter((item: any) => item.priority === 'minor');
    },
    myItems(this: any) {
      return this.itemList.filter((item: any) => item.assignee.id === this.currentUser.id);
    },
    recentItems(this: any) {
      return this.itemList.sort((item1: any, item2: any) => item2.updatedDate - item1.updatedDate);
    },
    statuses(this: any) {
      return [{
        title: 'Todo',
        count: this.todoCount,
        color: '#208ce1',
      }, {
        title: 'In Progress',
        count: this.progressCount,
        color: '#fcdc04',
      }, {
        title: 'Completed',
        count: this.completedCount,
        color: '#42b983',
      }, {
        title: 'Closed',
        count: this.closedCount,
        color: '#844CD3',
      }];
    },
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
    sort(this: any, filter: string) {
      this.sortBy = filter;
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
    padding: 1rem 2rem 0;
  }

  &_board {
    padding: 0 2rem 2rem;
  }
}
</style>

