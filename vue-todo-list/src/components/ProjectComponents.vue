<template>
  <div class="projectComponents">
    <ProjectHeader title="Components" buttonText="Add Component" :toggleDialog="toggleDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import ProjectHeader from '@/components/ProjectHeader.vue';

export default {
  components: {
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    this.proj = this.projects[index];
  },
  data: () => ({
    id: String,
    proj: String,
    show: false,
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
