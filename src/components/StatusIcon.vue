<template>
  <i :class="`fas fa-circle ${status}`" />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  props: {
    status: {
      type: String,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.todo {
  color: @deep-cerise;
  font-size: 0.7rem;
  padding-right: 0.3rem;
}

.inProgress {
  color: @golden-yellow;
  font-size: 0.7rem;
  padding-right: 0.3rem;
}

.completed {
  color: @medium-sea-green;
  font-size: 0.7rem;
  padding-right: 0.3rem;
}

.closed {
  color: @purple;
  font-size: 0.7rem;
  padding-right: 0.3rem;
}
</style>

