<template>
  <i class="closeButton fas fa-times" @click="onClose" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'CloseButton',

  props: {
    onClose: {
      type: Function,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.closeButton {
  border-radius: 50%;
  padding: 0.5rem 0.65rem;
  transition: 0.3s ease;

  &:hover {
    background-color: @medium-sea-green;
    cursor: pointer;
  }
}
</style>
