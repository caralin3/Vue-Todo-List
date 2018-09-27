<template>
  <i class="fas fa-tasks itemIcon" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'ItemIcon',
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.itemIcon {
  font-size: 1.5rem;
  padding: 0 0.5rem 0 1rem;
  color: @deep-cerise;
}
</style>

