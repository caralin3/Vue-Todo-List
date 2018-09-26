<template>
  <div class="sidebar">
    <div class="sidebar_header">
      <h1 class="sidebar_title">
        <router-link :to="'/projects/' + this.id">{{ getTitle() }}</router-link>
      </h1>
      <i class="fas fa-bars sidebar_menu" @click="onClick" />
    </div>
    <div class="sidebar_nav" :class="{'sidebar_active': active}">
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'activity'}}">Activity</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'board'}}">Board</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'features'}}">Features</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'items'}}">Items</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'members'}}">Team Members</router-link>
      <!-- <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'tasks'}}">Tasks</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'components'}}">Components</router-link>
      <router-link :to="{ path: '/projects/' + this.id, query: { filter: 'bugs'}}">Bugs</router-link> -->
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
    active: false,
    id: String,
    title: String,
  }),
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
    onClick(this: any) {
      this.active = !this.active;
    },
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
