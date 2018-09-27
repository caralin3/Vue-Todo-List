<template>
  <i :class="`fa-stack fa-2x comp ${extraClasses}`">
    <i class="fas fa-square fa-stack-2x comp-square" />
    <i class="fas fa-code fa-stack-1x fa-inverse comp-code" />
  </i>
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

.comp {
  font-size: 0.8rem;
  padding: 0 0.5rem 0 1rem;

  &-square {
    color: @safety-orange;
    margin-left: 0.2rem;
  }

  &-code {
    margin-left: 0.2rem;
  }
}
</style>

