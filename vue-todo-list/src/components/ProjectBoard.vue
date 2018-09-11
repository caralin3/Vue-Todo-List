<template>
  <div class="projectBoard">
    <h2 class="projectBoard_title">Board</h2>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    this.proj = this.projects[index];
  },
  data: () => ({
    id: String,
    proj: String,
  }),
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
  },
};
</script>
