<template>
  <div class="projects">
    <ProjectsHeader :toggleDialog="toggleDialog" />
    <ProjectList />
    <Dialog title="Create Project" :toggleDialog="toggleDialog" v-if="show">
      <h3>Create</h3>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Dialog from '@/components/Dialog.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';

@Component({
  components: {
    Dialog,
    ProjectsHeader,
    ProjectList,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },
})
export default class Projects extends Vue {}
</script>
