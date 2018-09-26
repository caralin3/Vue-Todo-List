<template>
  <i class="editButton fas fa-edit" @click="onClick" />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'EditButton',

  props: {
    onClick: {
      type: Function,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.editButton {
  transition: 0.2s ease;

  &:hover {
    color: @medium-sea-green;
    cursor: pointer;
  }
}
</style>
