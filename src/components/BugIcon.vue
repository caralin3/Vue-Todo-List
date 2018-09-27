<template>
  <i :class="`fa-stack fa-2x bug ${extraClasses}`">
    <i class="fas fa-square fa-stack-2x bug-square" />
    <i class="fas fa-circle fa-stack-1x fa-inverse bug-circle" />
  </i>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BugIcon',

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

.bug {
  font-size: 0.8rem;
  padding: 0 0.5rem 0 1rem;
  
  &-square {
    color: @red;
    margin-left: 0.2rem;
  }

  &-circle {
    margin-left: 0.2rem;
  }
}
</style>

