<template>
  <div class="project">
    <Sidebar />
    <div class="project_container" v-if="filter === 'board'">
      <h1>Board</h1>
    </div>
    <div class="project_container" v-if="filter === 'features'">
      <ProjectFeatures />
    </div>
    <div class="project_container" v-if="filter === 'tasks'">
      <h1>Tasks</h1>
    </div>
    <div class="project_container" v-if="filter === 'components'">
      <h1>Components</h1>
    </div>
    <div class="project_container" v-if="filter === 'bugs'">
      <h1>Bugs</h1>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import Sidebar from '@/components/Sidebar.vue';
import ProjectFeatures from '@/components/ProjectFeatures.vue';

@Component({
  components: {
    Sidebar,
    ProjectFeatures,
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
      console.log(this.filter);
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
