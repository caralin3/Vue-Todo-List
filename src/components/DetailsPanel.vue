<template>
  <div class="detailsPanel">
    <slot class="detailsPanel_body"></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DetailsPanel',
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.detailsPanel {
  background-color: fade(@medium-sea-green, 20%);
  color: @madison;
  padding: 2rem;
}
</style>

