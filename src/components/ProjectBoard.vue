<template>
  <div class="projectComponents">
    <div class="projectComponents_header">
      <ProjectHeader title="Board" buttonText="Add Board" :toggleDialog="toggleDialog" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
  },
  data: () => ({
    id: String,
    openDetails: false,
  }),
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },
};
</script>
