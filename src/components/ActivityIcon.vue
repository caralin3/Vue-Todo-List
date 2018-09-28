<template>
  <i :class="`fas fa-chart-line activityIcon ${extraClasses}`" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ActivityIcon',

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

.activityIcon {
  color: @red;
  font-size: 1.5rem;
  padding-left: 1rem;
}
</style>

