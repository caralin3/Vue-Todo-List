<template>
  <form class="form" @submit.prevent="onSubmit">
    <slot class="form_container"></slot>
    <button class="form_button" type="submit">{{ buttonText }}</button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  props: {
    buttonText: String,
    submit: Function,
    toggleDialog: Function,
  },
  methods: {
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmit(this: any) {
      this.submit();
      this.dismissDialog();
    },
  },
};
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.5rem 0;

  &_container {
    display: grid;
    gap: 5rem;
    grid-template: 
      "textLabel textInput"
      "label input" ~'/' 1fr 1fr;
  }

  &_button {
    .button;
    align-self: center;
    margin-top: 1.5rem;
  }
}
</style>
