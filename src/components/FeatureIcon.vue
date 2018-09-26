<template>
  <i :class="`fas fa-list-alt feature ${extraClasses}`" />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
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

.feature {
  font-size: 1.5rem;
  padding: 0 0.5rem 0 1rem;
  color: @purple;
}
</style>

