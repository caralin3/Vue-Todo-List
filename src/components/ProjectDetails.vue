<template>
  <div class="projectDetails">
    <div class="projectDetails_header">
      <h2 class="projectDetails_header-title">
        <span
          class="projectDetails_header-edit"
          contenteditable="true"
          @blur="handleTextChange('title', $event.target.innerText)"
        >
          {{ proj.title }}
        </span>
      </h2>
    </div>
    <details-panel class="projectDetails_body">
      <project-details-data :proj="proj" />
      <description 
        :on-change="handleTextChange"
        :text="proj.description"
      />
    </details-panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as fb from '@/firebase';
import { mapActions } from 'vuex';
import Description from './Description.vue';
import DetailsPanel from './DetailsPanel.vue';
import ProjectDetailsData from './ProjectDetailsData.vue';

export default Vue.extend({
  name: 'ProjectDetails',

  components: {
    Description,
    DetailsPanel,
    ProjectDetailsData,
  },

  props: {
    proj: {
      type: Object,
    },
  },

  data: () => ({
    updatedProject: {},
  }),

  created(this: any) {
    this.updatedProject = this.proj;
  },

  methods: {
    ...mapActions({
      editProject: 'projects/editProject',
    }),
    handleTextChange(this: any, type: string, value: string) {
      this.updatedProject = {
        ...this.updatedProject,
        [type]: value,
        startDate: new Date(this.updatedProject.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editProject(this.updatedProject);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.projectDetails {
  &_header {
    align-items: center;
    display: flex;
    padding: 2rem 2rem 0;
    
    &-title {
      color: @madison;
      margin: 0;
    }

    &-edit {
    padding: 0.3rem 0.5rem;

      &:hover {
        border: 1px solid @madison;
        cursor: pointer;
      }
    }
  }
  
  &_body {
    margin: 2rem;
  }
}
</style>
