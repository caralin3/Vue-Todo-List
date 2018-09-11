<template>
  <div class="projectHeader">
    <div class="projectHeader_text">
      <h2 class="projectHeader_title">{{ title }}</h2>
    </div>
    <button class="projectHeader_button" type="button" v-on:click="showDialog">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  props: {
    title: String,
    buttonText: String,
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
