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
import { Project } from '@/types';

export default {
  props: {
    title: String,
    toggleDialog: Function,
  },
  methods: {
    dismissDialog(this: any) {
      this.toggleDialog();
    },
  },
};
</script>
