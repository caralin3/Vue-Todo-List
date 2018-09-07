<template>
  <div class="projects">
    <ProjectsHeader />
    <ProjectList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';

@Component({
  components: {
    ProjectsHeader,
    ProjectList,
  },
})
export default class Projects extends Vue {}
</script>
