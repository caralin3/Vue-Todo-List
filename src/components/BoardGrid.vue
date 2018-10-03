<template>
  <div class="boardGrid">
    <div class="boardGrid_column"
      @dragover="dragOver($event)"
      @drop="onDrop($event, 'todo')"
    >
      <board-column :item-list="todo" />
    </div>
    <div class="boardGrid_column"
      @dragover="dragOver($event)"
      @drop="onDrop($event, 'inProgress')"
    >
      <board-column :item-list="progress" />
    </div>
    <div class="boardGrid_column"
      @dragover="dragOver($event)"
      @drop="onDrop($event, 'testing')"
    >
      <board-column :item-list="testing" />
    </div>
    <div class="boardGrid_column"
      @dragover="dragOver($event)"
      @drop="onDrop($event, 'completed')"
    >
      <board-column :item-list="completed" />
    </div>
    <div class="boardGrid_column boardGrid_column-closed"
      @dragover="dragOver($event)"
      @drop="onDrop($event, 'closed')"
    >
      <board-column :item-list="closed" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import BoardCard from './BoardCard.vue';
import BoardColumn from './BoardColumn.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'BoardGrid',

  components: {
    BoardCard,
    BoardColumn,
  },

  props: {
    itemList: {
      type: Array,
    },
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
    }),
    todo(this: any) {
      return this.itemList.filter((item: any) => item.status === 'todo');
    },
    progress(this: any) {
      return this.itemList.filter((item: any) => item.status === 'inProgress');
    },
    testing(this: any) {
      return this.itemList.filter((item: any) => item.status === 'testing');
    },
    completed(this: any) {
      return this.itemList.filter((item: any) => item.status === 'completed');
    },
    closed(this: any) {
      return this.itemList.filter((item: any) => item.status === 'closed');
    },
  },

  methods: {
    ...mapActions({
      editFeature: 'features/editFeature',
      editItem: 'items/editItem',
    }),
    dragOver(event: any) {
      event.preventDefault();
    },
    update(item: Feature | Item, status: string) {
      const update = status === 'completed' ?
        {
          ...item,
          endDate: new Date().toString(),
          startDate: new Date(item.startDate).toString(),
          status,
          updatedDate: new Date().toString(),
        }
        : {
          ...item,
          startDate: new Date(item.startDate).toString(),
          status,
          updatedDate: new Date().toString(),
        };
      return update;
    },
    onDrop(this: any, event: any, status: string) {
      const id = event.dataTransfer.getData('text');
      const feature = this.features.filter((f: Feature) => f.id === id)[0];
      const item = this.items.filter((i: Item) => i.id === id)[0];

      if (feature) {
        this.editFeature(this.update(feature, status));
      } else if (item) {
        this.editItem(this.update(item, status));
      }
      event.preventDefault();
      event.stopPropagation();
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.boardGrid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(5, 1fr);
  padding: 1rem 0;

  @media only screen and (max-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
  }

  &_column {
    background-color: fade(@medium-sea-green, 20%);

    @media only screen and (max-width: 640px) {
      &-closed {
        display: none;
      }
    }
  }
}
</style>

