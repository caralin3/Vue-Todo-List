<template>
  <div class="project">
    <sidebar :title="title" />
    <div class="project_container" v-if="filter === 'activity'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'board'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'features'">
      <items icon="feature" :itemList="feats" />
    </div>
    <div class="project_container" v-if="filter === 'items'">
      <ProjectTasks />
    </div>
    <div class="project_container" v-if="filter === 'tasks'">
      <ProjectTasks />
    </div>
    <div class="project_container" v-if="filter === 'components'">
      <ProjectComponents />
    </div>
    <div class="project_container" v-if="filter === 'bugs'">
      <ProjectBugs />
    </div>
    <div class="project_container" v-if="filter === 'members'">
      <ProjectBugs />
    </div>
    <div class="project_container" v-if="!filter">
      <ProjectDetails />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import Items from '@/components/Items.vue';
import ProjectBoard from '@/components/ProjectBoard.vue';
import ProjectBugs from '@/components/ProjectBugs.vue';
import ProjectComponents from '@/components/ProjectComponents.vue';
import ProjectDetails from '@/components/ProjectDetails.vue';
import ProjectTasks from '@/components/ProjectTasks.vue';
import Sidebar from '@/components/Sidebar.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'Project',

  components: {
    Items,
    ProjectBoard,
    ProjectBugs,
    ProjectComponents,
    ProjectDetails,
    ProjectTasks,
    Sidebar,
  },

  data: () => ({
    feats: [] as Feature[],
    filter: '',
    itemList: [] as Item[],
    title: '',
  }),

  created(this: any) {
    this.loadState();
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.features,
      projects: (state: any) => state.projects.projects,
    }),
  },

  methods: {
    loadState(this: any) {
      const id = this.$route.params.id;
      this.getFilter();

      // Get project title for sidebar
      if (this.projects && this.projects.length > 0) {
        const project = this.projects.filter((proj: any) => proj.id === id)[0];
        this.title = project.title;
      }

      // Get features
      if (this.features && this.features.length > 0) {
        this.feats = this.features.filter((feature: Feature) => feature.projectId === id);
      }

      // Get items
      if (this.items && this.items.length > 0) {
        this.itemList = this.items.filter((item: Item) => item.projectId === id);
      }

    },
    getFilter(this: any) {
      this.filter = this.$route.query.filter;
    },
  },

  watch: {
    '$route.query.filter'(this: any) {
      this.getFilter();
    },
  },
});
</script>
