<template>
  <transition class="alert" name="fade">
    <div class="alert_container">
      <p class="alert_text">{{ text }}</p>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Alert',

  props: {
    text: {
      type: String,
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.alert {
  &_container {
    background-color: @error;
    color: @white;
    padding: 0 1rem;
  }

  &_text {
    line-height: 2;
  }
}
</style>

