<template>
  <div class="projectHeader">
    <div class="projectHeader_text">
      <h2 class="projectHeader_title">{{ title }}</h2>
      <i class="fas fa-table board" v-if="title === 'Board'"/>
      <i class="fa-stack fa-2x bug" v-if="title === 'Bugs'">
        <i class="fas fa-square fa-stack-2x bug-square" />
        <i class="fas fa-circle fa-stack-1x fa-inverse" />
      </i>
      <i class="fa-stack fa-2x comp" v-if="title === 'Components'">
        <i class="fas fa-square fa-stack-2x comp-square" />
        <i class="fas fa-code fa-stack-1x fa-inverse" />
      </i>
      <i class="fas fa-list-alt feature" v-if="title === 'Features'" />
      <i class="fas fa-check-square task" v-if="title === 'Tasks'" />
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
