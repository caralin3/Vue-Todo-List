<template>
  <div class="taskDetails">
    <div class="taskDetails_header">
      <h2 class="taskDetails_title">
        <span
          class="taskDetails_detailsText-edit"
          contenteditable="true"
          @blur="handleTextChange('title', $event.target.innerText)"
        >
          {{ task.title }}
        </span>
        <i class="fas fa-check-square task" />
      </h2>
      <div class="taskDetails_buttons">
        <button class="taskDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="taskDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="taskDetails_comments" v-if="task.workFlow.length > 0 && show">
      <h3 class="taskDetails_commentsTitle">Workflow</h3>
      <!-- <div class="taskDetails_taskDetails" v-for="status in task.workFlow" :key="status.startDate.toString()">
        <p class="taskDetails_taskTitle">{{ status.status }}</p>
        <span class="taskDetails_taskDate">{{ status.startDate | date }}</span>
      </div> -->
    </div>
    <h3 class="taskDetails_subTitle">Details</h3>
    <div class="taskDetails_details">
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Assignee:</span>
        <span class="taskDetails_detailsText-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <span v-if="assignee.firstName === 'Select'">
            <i class="fas fa-user-circle taskDetails_details-userIcon" />
            {{ task.assignee | name }}
          </span>
          <span v-else>
            <i class="fas fa-user-circle taskDetails_details-userIcon" />
            {{ assignee | name }}
          </span>
        </span>
        <SelectUserInput
          :class="'taskDetails_select'"
          v-if="edit.assignee"
          v-model="assigneeId"
          :onBlur="() => this.edit.assignee = false"
          :onFocus="() => this.edit.assignee = true"
          :options="userOptions"
        />
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Created:</span>
        <span class="taskDetails_detailsText">
          {{ task.startDate | date }}
          {{ task.startDate | time }}
        </span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Reporter:</span>
        <span class="taskDetails_detailsText-edit" v-if="!edit.reporter" @click="toggleEdit('reporter')">
          <span v-if="reporter === 'Select'">
            <span v-if="task.reporter">
              <i class="fas fa-user-circle taskDetails_details-userIcon" />
              {{ task.reporter | name }}
            </span>
            <span v-else>
              <i class="fas fa-user-circle taskDetails_details-userIcon" />
              {{ reporter | name }}
            </span>
          </span>
          <span v-else> None</span>
        </span>
        <SelectUserInput
          :class="'taskDetails_select'"
          v-if="edit.reporter"
          v-model="reporterId"
          :onBlur="() => this.edit.reporter = false"
          :onFocus="() => this.edit.reporter = true"
          :options="userOptions"
        />
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Updated:</span>
        <span class="taskDetails_detailsText">
          {{ task.updatedDate | date }}
          {{ task.updatedDate | time }}
        </span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Priority:</span>
        <span class="taskDetails_detailsText-edit" v-if="!edit.priority" @click="toggleEdit('priority')">
           <span v-if="priority === 'Select Priority'">
            <i class="fas fa-ban" :class="task.priority" v-if="task.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="task.priority" v-if="task.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="task.priority" v-if="task.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="task.priority" v-if="task.priority === 'minor'" />
            {{ task.priority | capitalize }}
          </span>
          <span v-else>
            <i class="fas fa-ban" :class="priority" v-if="priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="priority" v-if="priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="priority" v-if="priority === 'major'" />
            <i class="fas fa-arrow-down" :class="priority" v-if="priority === 'minor'" />
            {{ priority | capitalize }}
          </span>
        </span>
        <SelectInput
          :class="'taskDetails_select'"
          v-if="edit.priority"
          v-model="priority"
          :onBlur="() => this.edit.priority = false"
          :onFocus="() => this.edit.priority = true"
          :options="priorityOptions"
        />
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Completed:</span>
        <span class="taskDetails_detailsText" v-if="task.endDate">
          {{ task.endDate | date }}
          {{ task.endDate | time }}
        </span>
        <span class="taskDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Status:</span>
        <span class="taskDetails_detailsText-edit" v-if="!edit.status" @click="toggleEdit('status')">
          <span v-if="status === 'Select Status'">
            <i class="fas fa-circle" :class="task.status" />
            {{ task.status | capitalize }}
          </span>
          <span v-else>
            <i class="fas fa-circle" :class="status" />
            {{ status | capitalize }}
          </span>
        </span>
        <SelectInput
          :class="'taskDetails_select'"
          v-if="edit.status"
          v-model="status"
          :onBlur="() => this.edit.status = false"
          :onFocus="() => this.edit.status = true"
          :options="statusOptions"
        />
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Version:</span>
        <span>
          {{ task.version.title }}
        </span>
      </div>
    </div>
    <div class="taskDetails_description">
      <h3 class="taskDetails_subTitle">Description</h3>
      <p 
        class="taskDetails_descriptionText taskDetails_detailsText-edit"
        contenteditable="true"
        @blur="handleTextChange('description', $event.target.innerText)"
      >
        {{ task.description }}
      </p>
    </div>
    <span class="featureDetails_subtitle">
      <h3 class="featureDetails_subtitle-title">Links</h3>
      <i class="fas fa-plus featureDetails_subtitle-add" />
    </span>
    <div class="taskDetails_links" v-if="taskLinks && taskLinks.length > 0">
      <div class="taskDetails_linkList" v-for="link in taskLinks" :key="link.id">
          <div class="taskDetails_linkRow"
            :class="{'taskDetails_linkRow-border': edit.link.editing && edit.link.id === link.id}"
            :contenteditable="edit.link.editing && edit.link.id === link.id"
            @blur="handleLinkChange($event.target.innerText, link)"
          >
            <a class="taskDetails_link" :href="updatedLink.to ? updatedLink.to : link.to" target="_blank">{{ link.to }}</a>
            <i class="fas fa-edit taskDetails_linkEdit" v-if="!edit.link.editing" @click="toggleEditLink(link.id)" />
          </div>
      </div>
    </div>
    <div class="taskDetails_linkList" v-else>
      <p class="taskDetails_noLinks">No links</p>
    </div>
    <h3 class="taskDetails_subTitle">Feature</h3>
    <div class="taskDetails_feature">
      <router-link
        class="taskDetails_featureDetails"
        :projId="projId"
        :to="{ path: '/projects/' + projId, query: { filter: 'features'}}"
        :key="taskFeature.id"
      >
        <span class="taskDetails_featureText">
          <i class="fas fa-list-alt feature" />
          <span class="taskDetails_featureTitle">{{ taskFeature.title }}</span>
        </span>
        <span class="taskDetails_featureDate">
          Updated: {{ taskFeature.updatedDate | date }} {{ taskFeature.updatedDate | time }}
        </span>
      </router-link>
    </div>
    <span class="featureDetails_subtitle">
      <h3 class="featureDetails_subtitle-title">Comments</h3>
      <i class="fas fa-plus featureDetails_subtitle-add" />
    </span>
    <div class="taskDetails_comments" v-if="taskComments && taskComments.length > 0">
      <div class="taskDetails_commentDetails" v-for="comment in taskComments" :key="comment.id">
        <span class="taskDetails_commentUser">
          <i class="fas fa-user-circle taskDetails_details-userIcon" />
          <span class="taskDetails_commentUsername">
            {{ comment.user | name }}
          </span>
          commented on
        </span>
        <span class="taskDetails_commentDate">
          {{ comment.startDate | date }}
          {{ comment.startDate | time }}
        </span>
        <span v-if="updatedComment.updatedDate || comment.updatedDate">
            updated on
        </span>
        <span class="featureDetails_commentDate" v-if="updatedComment.updatedDate && !comment.updatedDate">
          {{ updatedComment.updatedDate | date }}
          {{ updatedComment.updatedDate | time }}
        </span>
        <span class="featureDetails_commentDate" v-if="updatedComment.updatedDate || comment.updatedDate">
          {{ comment.updatedDate | date }}
          {{ comment.updatedDate | time }}
        </span>
        <p
          class="taskDetails_commentText"
          contenteditable="true"
          @blur="handleCommentChange($event.target.innerText, comment)"
        >
          {{ comment.text }}
        </p>
      </div>
    </div>
    <div class="taskDetails_comments" v-else>
      <p class="taskDetails_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import { Comment, Feature, Item, Link, priorityType, statusType, User } from '@/types';
import { getUserOptions, priorityOptions, statusOptions } from '@/utils/constants';

export default {
  created(this: any) {
    this.projId = this.$route.params.id;
    this.loadTaskState();
    this.userOptions = getUserOptions();
  },
  components: {
    Dialog,
    SelectInput,
    SelectUserInput,
  },
  props: {
    task: {},
    closeDetails: Function,
  },
  data: () => ({
    assignee: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    assigneeId: '',
    edit: {
      assignee: false,
      link: {
        editing: false,
        id: '',
      },
      priority: false,
      reporter: false,
      status: false,
    },
    taskComments: [] as Comment[],
    taskFeature: {} as Feature,
    taskLinks: [] as Link[],
    projId: String,
    reporter: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    reporterId: '',
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    show: false,
    status: 'Select Status' as statusType,
    statusOptions,
    title: String,
    updatedComment: {} as Comment,
    updatedItem: {} as Item,
    updatedLink: {} as Link,
    userOptions: [] as string[],
  }),
  computed: {
    ...mapState({
      comments: (state: any) => state.comments.comments,
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
      links: (state: any) => state.links.links,
    }),
  },
  methods: {
    ...mapActions({
      editComment: 'comments/editComment',
      editItem: 'items/editItem',
      editLink: 'links/editLink',
    }),
    initalizeTaskArrays(ids: string[], stateArray: any[], taskArray: any[]) {
      for (const id of ids) {
        for (const v of stateArray) {
          if (v.id === id) {
            taskArray.push(v);
          }
        }
      }
    },
    loadTaskState(this: any) {
      const index: number = this.items.findIndex((t: Item) => t.id === this.task.id && t.type === this.task.type);
      const featureId = this.items[index].featureId;
      this.updatedItem = this.items[index];
      this.taskComments = [];
      this.taskLinks = [];

      if (this.items[index].comments) {
        const commentIds = this.items[index].comments;
        this.initalizeTaskArrays(commentIds, this.comments, this.taskComments);
      }
      if (this.items[index].links) {
        const linkIds = this.items[index].links;
        this.initalizeTaskArrays(linkIds, this.links, this.taskLinks);
      }
      this.taskFeature = this.features.filter((f: Feature) => f.id === featureId)[0];
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    handleCommentChange(this: any, value: string, comm: Comment) {
      this.updatedComment = {
        id: comm.id,
        startDate: comm.startDate,
        text: value,
        updatedDate: new Date(),
        user: comm.user,
      };
      this.editComment(this.updatedComment);
    },
    handleLinkChange(this: any, value: string, link: Link) {
      this.updatedLink = {
        id: link.id,
        startDate: link.startDate,
        to: value,
        updatedDate: new Date(),
        user: link.user,
      };
      this.edit.link.editing = false;
      this.editLink(this.updatedLink);
    },
    handleTextChange(this: any, type: string, value: string) {
      if (type === 'description') {
        this.updatedItem = {
          ...this.updatedItem,
          description: value,
          updatedDate: new Date(),
        };
      } else if (type === 'title') {
        this.updatedItem = {
          ...this.updatedItem,
          title: value,
          updatedDate: new Date(),
        };
      }
      this.editItem(this.updatedItem);
    },
    toggleEditLink(this: any, id: string) {
      this.edit.link = {
        id,
        editing: true,
      };
    },
    toggleEdit(this: any, type: string) {
      if (type === 'assignee') {
        this.edit.assignee = !this.edit.assignee;
      } else if (type === 'priority') {
        this.edit.priority = !this.edit.priority;
      } else if (type === 'reporter') {
        this.edit.reporter = !this.edit.reporter;
      } else if (type === 'status') {
        this.edit.status = !this.edit.status;
      }
    },
  },
  watch: {
    assigneeId(this: any) {
      this.edit.assignee = !this.edit.assignee;
      for (const user of this.userOptions) {
        if (user.id === this.assigneeId) {
          this.assignee = user;
        }
      }
      this.updatedItem = {
        ...this.updatedItem,
        assignee: this.assignee,
        updatedDate: new Date(),
      };
      this.editItem(this.updatedItem);
    },
    task(this: any) {
      this.loadTaskState();
    },
    priority(this: any) {
      this.edit.priority = !this.edit.priority;
      this.updatedItem = {
        ...this.updatedItem,
        priority: this.priority,
        updatedDate: new Date(),
      };
      this.editItem(this.updatedItem);
    },
    reporterId(this: any) {
      this.edit.reporter = !this.edit.reporter;
      for (const user of this.userOptions) {
        if (user.id === this.reporterId) {
          this.reporter = user;
        }
      }
      this.updatedItem = {
        ...this.updatedItem,
        reporter: this.reporter,
        updatedDate: new Date(),
      };
      this.editItem(this.updatedItem);
    },
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.updatedItem = {
        ...this.updatedItem,
        status: this.status,
        updatedDate: new Date(),
      };
      this.editItem(this.updatedItem);
    },
  },
};
</script>
