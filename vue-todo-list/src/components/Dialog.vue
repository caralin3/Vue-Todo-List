<template>
  <div class="dialog">
    <div class="dialog_content">
      <div class="dialog_header">
        <h2 class="dialog_title">{{ title }}</h2>
        <i class="dialog_x fas fa-times" @click="dismissDialog" />
      </div>
      <slot></slot>
      <button class="dialog_button" type="button" v-on:click="add()">Add Project</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import { Project } from '@/types';

export default {
  props: {
    title: String,
    toggleDialog: Function,
  },
  methods: {
    ...mapActions('projects', [
      'addProject',
    ]),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    add(this: any, proj: Project) {
      // this.addProject(proj);
      this.dismissDialog();
    },
  },
};
</script>
