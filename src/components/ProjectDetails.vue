<template>
  <div class="projectDetails">
    <div class="projectDetails_header">
      <h2 class="projectDetails_header-title">
        <span
          class="projectDetails_detailsText-edit"
          contenteditable="true"
          @blur="handleTextChange('title', $event.target.innerText)"
        >
          {{ proj.title }}
        </span>
      </h2>
      <div class="projectDetails_header-buttons">
        <button class="projectDetails_workflowButton" type="button">View Workflow</button>
      </div>
    </div>
    <div class="projectDetails_body">
      <h3 class="projectDetails_subtitle">
        Details
      </h3>
      <div class="projectDetails_details">
        <div class="projectDetails_detailsData">
          <span class="projectDetails_detailsLabel">Created by:</span>
          <span class="projectDetails_detailsText">
            <i class="fas fa-user-circle projectDetails_details-userIcon" />
            {{ proj.creator | name }}
          </span>
        </div>
        <div class="projectDetails_detailsData">
          <span class="projectDetails_detailsLabel">Created:</span>
          <span class="projectDetails_detailsText">
            {{ new Date(proj.startDate) | date }}
            {{ new Date(proj.startDate) | time }}
          </span>
        </div>
        <div class="projectDetails_detailsData">
          <span class="projectDetails_detailsLabel">Status:</span>
          <span class="projectDetails_detailsText-edit" v-if="!edit.status" @click="toggleStatus">
            <span v-if="status === 'Select Status'">
              <i class="fas fa-circle" :class="proj.status" />
              {{ proj.status | capitalize }}
            </span>
            <span v-else>
              <i class="fas fa-circle" :class="status" />
              {{ status | capitalize }}
            </span>
          </span>
          <SelectInput
            :class="'projectDetails_select'"
            v-if="edit.status"
            v-model="status"
            :onBlur="() => this.edit.status = false"
            :onFocus="() => this.edit.status = true"
            :options="statusOptions"
          />
        </div>
        <div class="projectDetails_detailsData">
          <span class="projectDetails_detailsLabel">Updated:</span>
          <span class="projectDetails_detailsText">
            {{ new Date(proj.updatedDate) | date }}
            {{ new Date(proj.updatedDate) | time }}
          </span>
        </div>
        <div class="projectDetails_detailsData">
          <span class="projectDetails_detailsLabel">Version:</span>
        </div>
        <div class="projectDetails_detailsData">
          <span class="projectDetails_detailsLabel">Completed:</span>
          <span class="projectDetails_detailsText" v-if="proj.endDate">
            {{ new Date(proj.endDate) | date }}
            {{ new Date(proj.endDate) | time }}
          </span>
          <span class="projectDetails_detailsText" v-else>TBD</span>
        </div>
      </div>
      <div class="projectDetails_description">
        <h3 class="projectDetails_subTitle">Description</h3>
        <p 
          class="projectDetails_descriptionText projectDetails_detailsText-edit"
          contenteditable="true"
          @blur="handleTextChange('description', $event.target.innerText)"
        >
          <span v-if="proj.description !== ''">{{ proj.description }}</span>
          <span v-else>No description</span>
        </p>
      </div>
      <span class="projectDetails_subtitle">
        <h3 class="projectDetails_subtitle-title">Links</h3>
        <i class="fas fa-plus projectDetails_subtitle-add" />
      </span>
      <div class="projectDetails_links" v-if="projLinks && projLinks.length > 0">
        <div class="projectDetails_linkList" v-for="link in projLinks" :key="link.id">
            <div class="projectDetails_linkRow"
              :class="{'projectDetails_linkRow-border': edit.link.editing && edit.link.id === link.id}"
              :contenteditable="edit.link.editing && edit.link.id === link.id"
              @blur="handleLinkChange($event.target.innerText, link)"
            >
              <a class="projectDetails_link" :href="updatedLink.to ? updatedLink.to : link.to" target="_blank">{{ link.to }}</a>
              <i class="fas fa-edit projectDetails_linkEdit" v-if="!edit.link.editing" @click="toggleEditLink(link.id)" />
            </div>
        </div>
      </div>
      <div class="projectDetails_linkList" v-else>
        <p class="projectDetails_noLinks">No links</p>
      </div>
      <span class="projectDetails_subtitle">
        <h3 class="projectDetails_subtitle-title">Features</h3>
        <i class="fas fa-plus projectDetails_subtitle-add" @click="toggleAddDialog()" />
      </span>
      <div class="projectDetails_features" v-if="projFeatures && projFeatures.length > 0">
        <router-link
          class="projectDetails_featureDetails"
          v-for="feature in projFeatures"
          :id="id"
          :to="{ path: '/projects/' + id, query: { filter: 'features'}}"
          :key="feature.id"
        >
          <span class="projectDetails_featureText">
            <span class="projectDetails_featureTitle">{{ feature.title }}</span>
            <i class="fas fa-ban" :class="feature.priority" v-if="feature.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="feature.priority" v-if="feature.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="feature.priority" v-if="feature.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="feature.priority" v-if="feature.priority === 'minor'" />
          </span>
          <span class="projectDetails_featureDate">
            Updated: {{ new Date(feature.updatedDate) | date }} {{ new Date(feature.updatedDate) | time }}
          </span>
        </router-link>
      </div>
      <div class="projectDetails_features" v-else>
        <p>No features</p>
      </div>
      <span class="projectDetails_subtitle">
        <h3 class="projectDetails_subtitle-title">Comments</h3>
        <i class="fas fa-plus projectDetails_subtitle-add" />
      </span>
      <div class="projectDetails_comments" v-if="projComments && projComments.length > 0">
        <div class="projectDetails_commentDetails" v-for="comment in projComments" :key="comment.id">
          <span class="projectDetails_commentUser">
            <i class="fas fa-user-circle projectDetails_details-userIcon" />
            <span class="projectDetails_commentUsername">
              {{ comment.user | name }}
            </span>
            commented on
          </span>
          <span class="projectDetails_commentDate">
            {{ new Date(comment.startDate) | date }}
            {{ new Date(comment.startDate) | time }}
          </span>
          <span v-if="updatedComment.updatedDate || comment.updatedDate">
            updated on
          </span>
          <span class="projectDetails_commentDate" v-if="updatedComment.updatedDate && !comment.updatedDate">
            {{ new Date(updatedComment.updatedDate) | date }}
            {{ new Date(updatedComment.updatedDate) | time }}
          </span>
          <span class="projectDetails_commentDate" v-if="updatedComment.updatedDate || comment.updatedDate">
            {{ new Date(comment.updatedDate) | date }}
            {{ new Date(comment.updatedDate) | time }}
          </span>
          <p
            class="projectDetails_commentText"
            contenteditable="true"
            @blur="handleCommentChange($event.target.innerText, comment)"
          >
            {{ comment.text }}
          </p>
        </div>
      </div>
      <div class="projectDetails_comments" v-else>
        <p class="projectDetails_noComments">No comments</p>
      </div>
    </div>
    <AddFeatureDialog v-if="showAddDialog" :toggleDialog="toggleAddDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as fb from '@/firebase';
import { mapActions, mapState } from 'vuex';
import AddFeatureDialog from '@/components/AddFeatureDialog.vue';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import { Comment, Feature, FirebaseProject, Link, Project, statusType, Version } from '@/types';
import { statusOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'ProjectDetails',

  components: {
    AddFeatureDialog,
    Dialog,
    SelectInput,
  },

  created(this: any) {
    this.id = this.$route.params.id;
    // this.loadFirebase();
    if (this.projects.length > 0) {
      const index: number = this.projects.findIndex((p: any) => p.id === this.id);
      this.proj = this.projects[index];
      this.loadProjectState();
    }
  },

  data: () => ({
    id: String,
    proj: {} as Project,
    edit: {
      link: {
        editing: false,
        id: '',
      },
      status: false,
    },
    projComments: [] as Comment[],
    projFeatures: [] as Feature[],
    projLinks: [] as Link[],
    projVersions: [] as Version[],
    showAddDialog: false,
    status: 'Select Status' as statusType,
    statusOptions,
    title: String,
    updatedComment: {} as Comment,
    updatedProject: {} as Project,
    updatedLink: {} as Link,
  }),

  computed: {
    ...mapState({
      comments: (state: any) => state.comments.comments,
      features: (state: any) => state.features.features,
      projects: (state: any) => state.projects.projects,
      links: (state: any) => state.links.links,
    }),
  },

  methods: {
    ...mapActions({
      editComment: 'comments/editComment',
      editProject: 'projects/editProject',
      editLink: 'links/editLink',
      setProjects: 'projects/setProjects',
    }),
    loadFirebase(this: any) {
      // realtime updates for projects collection
      fb.projectsCollection.orderBy('startDate', 'asc').onSnapshot((querySnapshot: any) => {
        if (querySnapshot.docChanges().length === querySnapshot.docs.length) {
          const projectList: Project[] = [];

          querySnapshot.forEach((doc: any) => {
            const project = doc.data();
            project.startDate = new Date(doc.data().startDate);
            project.updatedDate = new Date(doc.data().updatedDate);
            if (project.endDate) {
              project.endDate = new Date(doc.data().endDate.toString());
            }
            project.id = doc.id;
            projectList.push(project);
          });

          this.setProjects(projectList);
        }
      });
    },
    initalizeProjectArrays(ids: string[], stateArray: any[], projArray: any[]) {
      for (const id of ids) {
        for (const v of stateArray) {
          if (v.id === id) {
            projArray.push(v);
          }
        }
      }
    },

    loadProjectState(this: any) {
      const index: number = this.projects.findIndex((p: any) => p.id === this.proj.id);
      this.updatedProject = this.projects[index];
      this.projComments = [];
      this.projFeatures = [];
      this.projLinks = [];
      if (this.projects[index].comments) {
        const commentIds = this.projects[index].comments;
        this.initalizeProjectArrays(commentIds, this.comments, this.projComments);
      }
      if (this.projects[index].features.length > 0) {
        const featureIds = this.projects[index].features;
        this.initalizeProjectArrays(featureIds, this.features, this.projFeatures);
      }
      if (this.projects[index].links) {
        const linkIds = this.projects[index].links;
        this.initalizeProjectArrays(linkIds, this.links, this.projLinks);
      }
    },
    toggleAddDialog(this: any) {
      this.showAddDialog = !this.showAddDialog;
    },
    // handleCommentChange(this: any, value: string, comm: Comment) {
    //   this.updatedComment = {
    //     id: comm.id,
    //     startDate: new Date(comm.startDate).toString(),
    //     text: value,
    //     updatedDate: new Date().toString(),
    //     user: comm.user,
    //   };
    //   this.editComment(this.updatedComment);
    // },
    // handleLinkChange(this: any, value: string, link: Link) {
    //   this.updatedLink = {
    //     id: link.id,
    //     startDate: new Date(link.startDate).toString(),
    //     to: value,
    //     updatedDate: new Date().toString(),
    //     user: link.user,
    //   };
    //   this.edit.link.editing = false;
    //   this.editLink(this.updatedLink);
    // },
    handleTextChange(this: any, type: string, value: string) {
      if (type === 'description') {
        this.updatedProject = {
          ...this.updatedProject,
          description: value,
          startDate: new Date(this.updatedProject.startDate).toString(),
          updatedDate: new Date().toString(),
        };
      } else if (type === 'title') {
        this.updatedProject = {
          ...this.updatedProject,
          title: value,
          startDate: new Date(this.updatedProject.startDate).toString(),
          updatedDate: new Date().toString(),
        };
      }
      this.editProject(this.updatedProject);
    },
    toggleEditLink(this: any, id: string) {
      this.edit.link = {
        id,
        editing: true,
      };
    },
    toggleStatus(this: any) {
      this.edit.status = !this.edit.status;
    },
  },

  watch: {
    // features(this: any) {
    //   console.log('Features changed');
    //   this.loadFirebase();
    // },
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.updatedProject = {
        ...this.updatedProject,
        status: this.status,
        startDate: new Date(this.updatedProject.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      if (this.status === 'completed' || this.status === 'closed') {
        this.updatedProject.endDate = new Date().toString();
      } else {
        this.updatedProject.endDate = null;
      }
      this.editProject(this.updatedProject);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.projectDetails {
  padding: 2rem 2rem 0 0;

  &_header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    
    &-title {
      margin: 0;
    }
    
    &-buttons {
      align-items: center;
      display: grid;
      column-gap: 1.5rem;
      grid-template-columns: 2fr auto;
    }
  }
  
  &_workflowButton {
    .button;
  }
  
  &_body {
    background-color: fade(@medium-sea-green, 20%);
    color: @madison;
    margin: 2rem 2.5rem 2rem 2rem;
    padding: 2rem;
  }

  &_subtitle {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-right: 2rem;

    &-title {
      padding: 1rem 0;
    }

    &-add {
      border-radius: 50%;
      padding: 0.5rem 0.65rem;
      transition: 0.3s ease;

      &:hover {
        background-color: @medium-sea-green;
        cursor: pointer;
      }
    }
  }

  &_details,
  &_linkList,
  &_features {
    padding: 0 2rem;
  }

  &_details {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);

    &-userIcon {
      padding-right: 0.3rem;
    }
  }

  &_detailsData {
    align-items: center;
    display: grid;
    grid-template-columns: 6rem 1fr;
  }

  &_detailsLabel {
    font-weight: bold;
  }

  &_detailsText,
  &_detailsText-edit {
    padding: 0.3rem 0.5rem;

    &-edit:hover {
      border: 1px solid @madison;
      cursor: pointer;
    }
  }

  &_comments {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &_commentDetails {
    background-color: @white;
    color: @madison;
    margin: 0 0 1rem 0;
    padding: 1rem 1rem 0;
    width: 60rem;
  }

  &_commentUsername {
    font-weight: bold;
  }

  &_commentText {
    padding: 0.5rem;
    
    &:hover {
      border: 1px solid @madison;
      cursor: pointer;
    }
  }

  &_descriptionText {
    margin: 0 2rem;
  }

  &_linkRow {
    align-items: center;
    display: flex;
    justify-content: space-between;

    &:hover {
      .projectDetails_linkEdit {
        cursor: pointer;
        opacity: 1;
      }
    }

    &-border {
      padding: 0.3rem 0.5rem;
      border: 1px solid @madison;
    }
  }

  &_linkEdit {
    opacity: 0;
    padding: 0.5rem 1rem;
  }

  &_select {
    select {
      border: none;
      // box-shadow: 3px 3px 5px rgba(114, 113, 113, 0.4);
      height: 1.8rem;
      width: 100%;
    }

    option {
      border: none;
    }
  }

  &_link,
  &_featureDetails {
    color: @madison;

    &:hover {
      color: darken(@medium-sea-green, 10%);

      .projectDetails_featureTitle,
      .projectDetails_featureDate {
        text-decoration: underline;
      }
    }
  }

  &_features {
    display: flex;
    flex-direction: column;
  }

  &_featureDetails {
    display: flex;
    justify-content: space-between;
  }

  &_featureTitle {
    padding-right: 1rem;
  }

  &_featureText {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
  }
}
</style>
