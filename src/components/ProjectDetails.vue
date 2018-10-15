<template>
  <div class="projectDetails">
    <add-user-dialog v-if="showDialog" :proj="proj" :toggle-dialog="toggleDialog" />
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
      <button class="projectDetails_header-button" type="button" v-on:click="toggleDialog">
        Add Collaborator
      </button>
    </div>
    <details-panel class="projectDetails_body">
      <project-details-data :on-change="handleTextChange" :proj="proj" />
      <description 
        :on-change="handleTextChange"
        :text="proj.description"
      />
      <links :links="links" />
    </details-panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as fb from '@/firebase';
import { mapActions } from 'vuex';
import AddUserDialog from './AddUserDialog.vue';
import Description from './Description.vue';
import DetailsPanel from './DetailsPanel.vue';
import Links from './Links.vue';
import ProjectDetailsData from './ProjectDetailsData.vue';

export default Vue.extend({
  name: 'ProjectDetails',

  components: {
    AddUserDialog,
    Description,
    DetailsPanel,
    Links,
    ProjectDetailsData,
  },

  props: {
    links: {
      type: Array,
    },
    proj: {
      type: Object,
    },
  },

  data: () => ({
    showDialog: false,
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
        endDate: this.updatedProject.endDate,
        startDate: new Date(this.updatedProject.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editProject(this.updatedProject);
    },
    toggleDialog(this: any) {
      this.showDialog = !this.showDialog;
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
    justify-content: space-between;
    padding: 2rem 2rem 0;

    &-button {
      .button;
      max-height: none;
    }
    
    &-title {
      color: @madison;
      margin: 0;
    }

    &-edit {
      padding: 0.3rem 0.5rem;

      @media only screen and (max-width: 660px) {
        padding: 0.3rem 0;
      }

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
