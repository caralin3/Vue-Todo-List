<template>
  <div class="sidebar">
    <h1 class="sidebar_title">
      <router-link :to="'/projects/' + this.id">{{ getTitle() }}</router-link>
    </h1>
    <div class="sidebar_nav">
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'board'}}">Board</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'features'}}">Features</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'tasks'}}">Tasks</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'components'}}">Components</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'bugs'}}">Bugs</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  created(this: any) {
    this.id = this.$route.params.id;
  },
  data: () => ({
    id: String,
    title: String,
  }),
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
    getTitle(this: any) {
      if (this.projects.length > 0) {
        const index: number = this.projects.findIndex((p: any) => p.id === this.id);
        return this.projects[index].title;
      }
    },
  },
};
</script>

<style lang="less">
@import '../less/index.less';
</style>
