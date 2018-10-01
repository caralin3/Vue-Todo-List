<template>
  <div class="projects">
    <projects-header :toggleDialog="toggleDialog" />
    <project-list class="projects_list" v-if="projects.length > 0" />
    <h3 v-else class="projects_none">You don't have any projects yet.</h3>
    <add-project-dialog v-if="show" :toggleDialog="toggleDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState } from 'vuex';
import AddProjectDialog from '@/components/AddProjectDialog.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import { Project, User, statusType } from '@/types';
import { statusOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'Projects',

  components: {
    AddProjectDialog,
    ProjectsHeader,
    ProjectList,
  },

  data: () => ({
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
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.projects {
  display: flex;
  flex-direction: column;

  // &_list {
  //   align-self: center;
  // }

  &_none {
    align-self: center;
    justify-self: center;
  }
}
</style>
