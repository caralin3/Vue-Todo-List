<template>
  <div class="boardColumn">
    <div class="boardColumn_container" v-for="item in itemList" :key="item.id">
      <board-card :item="item" :item-type="item.featureId ? 'items' : 'features'" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import BoardCard from './BoardCard.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'BoardColumn',

  components: {
    BoardCard,
  },

  props: {
    itemList: {
      type: Array,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
</style>

