<template>
  <i :class="`fas fa-table boardIcon ${extraClasses}`" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'BoardIcon',

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

.boardIcon {
  color: @pink;
  font-size: 1.5rem;
  padding-left: 1rem;
}
</style>

