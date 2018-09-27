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

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.projectsHeader {
  align-items: center;
  color: @madison;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;

  &_text {
    align-items: center;
    display: flex;
    justify-content: flex-start;
  }

  &_count {
    padding: 0 1rem;
  }

  &_button {
    .button;
  }
}
</style>
