<template>
  <i class="deleteButton far fa-trash-alt" @click="onClick" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DeleteButton',

  props: {
    onClick: {
      type: Function,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.deleteButton {
  transition: 0.2s ease;

  &:hover {
    color: @medium-sea-green;
    cursor: pointer;
  }
}
</style>
