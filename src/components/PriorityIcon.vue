<template>
  <span>
    <i :class="`fas fa-ban ${priority}`" v-if="priority === 'blocker'" />
    <i :class="`fas fa-exclamation-triangle ${priority}`" v-if="priority === 'critical'" />
    <i :class="`fas fa-arrow-up ${priority}`" v-if="priority === 'major'" />
    <i :class="`fas fa-arrow-down ${priority}`" v-if="priority === 'minor'" />
  </span>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    priority: {
      type: String,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.blocker {
  color: @red;
  padding-right: 0.3rem;
}

.critical {
  color: @safety-orange;
  padding-right: 0.3rem;
}

.major {
  color: @yellow-orange;
  padding-right: 0.3rem;
}

.minor {
  color: @medium-sea-green;
  padding-right: 0.3rem;
}
</style>

