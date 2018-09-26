<template>
  <i class="fas fa-plus addButton" @click="onClick" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AddButton',

  props: {
    onClick: {
      type: Function,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.addButton {
  border-radius: 50%;
  padding: 0.5rem 0.65rem;
  transition: 0.3s ease;

  &:hover {
    background-color: @medium-sea-green;
    cursor: pointer;
  }
}
</style>
