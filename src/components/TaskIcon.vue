<template>
  <i :class="`fas fa-check-square task ${extraClasses}`" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TaskIcon',

  props: {
    extraClasses: {
      default: '',
      type: String,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.task {
  font-size: 1.5rem;
  padding: 0 0.5rem 0 1rem;
  color: @deep-cerise;
}
</style>

