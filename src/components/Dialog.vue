<template>
  <div class="dialog">
    <div class="dialog_content">
      <div class="dialog_header">
        <h2 class="dialog_title">{{ title }}</h2>
        <i class="dialog_x fas fa-times" @click="dismissDialog" />
      </div>
      <slot class='dialog_body'></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Dialog',

  props: {
    title: {
      default: '',
      type: String,
    },
    toggleDialog: {
      type: Function,
    },
  },

  methods: {
    dismissDialog(this: any) {
      this.toggleDialog();
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.dialog {
  background-color: rgba(0,0,0,0.4);
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  
  &_content {
    display: flex;
    background-color: @white;
    border: 1px solid @very-light-gray;
    flex-direction: column;
    margin: 5% auto;
    padding: 1.5rem 2rem;
    width: 50%;
  }

  &_header {
    align-items: center;
    border-bottom: 1px solid @very-light-gray;
    display: flex;
    justify-content: space-between;
  }
  
  &_x {
    border-radius: 50%;
    padding: 0.5rem 0.65rem;
    transition: 0.3s ease;

    &:hover {
      background-color: @medium-sea-green;
      cursor: pointer;
    }
  }

  &_title {
    // background-color: @madison;
    color: @medium-sea-green;
    margin: 0;
    padding: 0 0 1rem;
  }

  &_button {
    .button;
    align-self: center;
  }
}

@media only screen and (max-width: 640px) {
  .dialog {
    &_content {
      margin: 5% auto;
      padding: 1.5rem 2rem;
      width: 70%;
    }
  }
}
</style>
