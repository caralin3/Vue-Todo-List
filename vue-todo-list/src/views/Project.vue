<template>
  <div class="project">
    <Sidebar />
    <div class="project_container" v-if="filter === 'board'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'features'">
      <ProjectFeatures />
    </div>
    <!-- <div class="project_container" v-if="filter === 'tasks'">
      <ProjectTasks />
    </div>
    <div class="project_container" v-if="filter === 'components'">
      <ProjectComponents />
    </div>
    <div class="project_container" v-if="filter === 'bugs'">
      <ProjectBugs />
    </div> -->
    <div class="project_container" v-if="!filter">
      <ProjectDetails />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import Sidebar from '@/components/Sidebar.vue';
// import ProjectBoard from '@/components/ProjectBoard.vue';
// import ProjectBugs from '@/components/ProjectBugs.vue';
// import ProjectComponents from '@/components/ProjectComponents.vue';
import ProjectDetails from '@/components/ProjectDetails.vue';
import ProjectFeatures from '@/components/ProjectFeatures.vue';
// import ProjectTasks from '@/components/ProjectTasks.vue';

@Component({
  components: {
    Sidebar,
    // ProjectBoard,
    // ProjectBugs,
    // ProjectComponents,
    ProjectDetails,
    ProjectFeatures,
    // ProjectTasks,
  },
  created(this: any) {
    this.getFilter();
  },
  data: () => ({
    filter: String,
  }),
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
})
export default class Project extends Vue {}
</script>
