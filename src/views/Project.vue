<template>
  <div class="project">
    <sidebar :title="projectTitle" />
    <div class="project_container" v-if="filter === 'activity'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'board'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'features'">
      <items :itemList="featureList" />
    </div>
    <div class="project_container" v-if="filter === 'items'">
      <items :itemList="itemList" />
    </div>
    <div class="project_container" v-if="filter === 'members'">
      <ProjectBoard />
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
import ProjectDetails from '@/components/ProjectDetails.vue';
import Sidebar from '@/components/Sidebar.vue';
import { Feature, Item } from '@/types';

export default Vue.extend({
  name: 'Project',

  components: {
    Items,
    ProjectBoard,
    ProjectDetails,
    Sidebar,
  },

  data: () => ({
    id: '',
    filter: '',
  }),

  created(this: any) {
    this.id = this.$route.params.id;
    this.getFilter();
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
      projects: (state: any) => state.projects.projects,
    }),
    projectTitle(this: any) {
      const project = this.projects.filter((proj: any) => proj.id === this.id)[0];
      return this.title = project.title;
    },
    featureList(this: any) {
      return this.features.filter((feature: Feature) => feature.projectId === this.id);
    },
    itemList(this: any) {
      return this.items.filter((item: Item) => item.projectId === this.id);
    },
  },

  methods: {
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

<style lang="less" scoped>
@import '../less/variables.less';

.project {
  display: grid;
  grid-template: "sidebar body" ~'/' minmax(auto, 15%) 1fr;

  @media only screen and (max-width: 640px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  &_container {
    grid-area: body;

    @media only screen and (max-width: 640px) {
      width: 100%;
    }
  }
}
</style>

