<template>
  <div class="boardStatusTitle" :style="lineStyle">
    <h3 class="boardStatusTitle_title">{{ status.title }}</h3>
    <h3 class="boardStatusTitle_count">({{ status.count }})</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BoardStatusTitle',

  props: {
    status: {
      type: Object,
    },
  },

  computed: {
    lineStyle(this: any) {
      return 'border-color: ' + this.status.color;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.boardStatusTitle {
  border-bottom: 3px solid;
  display: flex;

  &_title {
    color: @madison;
  }
  
  &_count {
    color: @madison;
    padding: 0 0.5rem;
  }
}
</style>

