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
