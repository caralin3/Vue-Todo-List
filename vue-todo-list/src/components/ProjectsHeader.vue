<template>
  <div class="projectsHeader">
    <div class="projectsHeader_text">
      <h1 class="projectsHeader_title">Projects</h1>
      <h2 class="projectsHeader_count">({{ projectCount }})</h2>
    </div>
    <!-- <button type="button" v-on:click="removeProject()">+</button> -->
    <button class="projectsHeader_button" type="button" v-on:click="showDialog">New Project</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  props: {
    toggleDialog: Function,
  },
  computed: {
    ...mapGetters('projects', [
      'projectCount',
    ]),
  },
  methods: {
    ...mapActions('projects', [
      'addProject',
      'removeProject',
    ]),
    showDialog(this: any) {
      this.toggleDialog();
    },
  },
};
</script>
