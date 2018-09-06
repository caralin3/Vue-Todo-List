<template>
  <div class="projects">
    <ProjectList />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectList from '@/components/ProjectList.vue';

@Component({
  components: {
    ProjectList,
  },
})
export default class Projects extends Vue {}
</script>
