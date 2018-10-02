<template>
  <div class="boardStatusHeader">
    <div class="boardStatusHeader_list" v-for="(status, index) in statuses" :key="index">
      <board-status-title :status="status" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import BoardStatusTitle from './BoardStatusTitle.vue';

export default Vue.extend({
  name: 'BoardStatusHeader',

  components: {
    BoardStatusTitle,
  },

  props: {
    statuses: {
      type: Array,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.boardStatusHeader {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(4, 1fr);

  @media only screen and (max-width: 640px) {
    gap: 0.5rem;
  }
}
</style>

