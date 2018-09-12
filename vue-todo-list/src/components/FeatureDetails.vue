<template>
  <div class="featureDetails">
    <div class="featureDetails_header">
      <h2 class="featureDetails_title">
        {{ feature.title }}
        <i class="fas fa-list-alt feature" />
      </h2>
      <div class="featureDetails_buttons">
        <button class="featureDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="featureDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="featureDetails_comments" v-if="feature.workFlow.length > 0 && show">
      <h3 class="featureDetails_commentsTitle">Workflow</h3>
      <div class="featureDetails_featureDetails" v-for="status in feature.workFlow" :key="status.startDate.toString()">
        <p class="featureDetails_featureTitle">{{ status.status }}</p>
        <span class="featureDetails_featureDate">{{ status.startDate | date }}</span>
      </div>
    </div>
    <h3 class="featureDetails_detailsTitle">Details</h3>
    <div class="featureDetails_details">
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Assignee:</span>
        <span class="featureDetails_detailsText-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <i class="fas fa-user-circle featureDetails_details-userIcon" />
          {{ feature.assignee | name }}
        </span>
        <SelectInput
          :class="'featureDetails_select'"
          v-if="edit.assignee"
          v-model="assignee"
          :onBlur="() => this.edit.assignee = false"
          :onFocus="() => this.edit.assignee = true"
          :options="userOptions"
        />
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Created:</span>
        <span class="featureDetails_detailsText">
          {{ feature.startDate | date }}
          {{ feature.startDate | time }}
        </span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Reporter:</span>
        <span class="featureDetails_detailsText-edit" v-if="!edit.reporter" @click="toggleEdit('reporter')">
          <span v-if="feature.reporter">
            <i class="fas fa-user-circle featureDetails_details-userIcon" />
            {{ feature.reporter | name }}
          </span>
          <span v-else> None</span>
        </span>
        <SelectInput
          :class="'featureDetails_select'"
          v-if="edit.reporter"
          v-model="reporter"
          :onBlur="() => this.edit.reporter = false"
          :onFocus="() => this.edit.reporter = true"
          :options="userOptions"
        />
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Updated:</span>
        <span class="featureDetails_detailsText">
          {{ feature.updatedDate | date }}
          {{ feature.updatedDate | time }}
        </span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Priority:</span>
        <span class="featureDetails_detailsText-edit" v-if="!edit.priority" @click="toggleEdit('priority')">
          <i class="fas fa-ban" :class="feature.priority" v-if="feature.priority === 'blocker'" />
              <i class="fas fa-exclamation-triangle" :class="feature.priority" v-if="feature.priority === 'critical'" />
              <i class="fas fa-arrow-up" :class="feature.priority" v-if="feature.priority === 'major'" />
              <i class="fas fa-arrow-down" :class="feature.priority" v-if="feature.priority === 'minor'" />
          {{ feature.priority | capitalize }}
        </span>
        <SelectInput
          :class="'featureDetails_select'"
          v-if="edit.priority"
          v-model="priority"
          :onBlur="() => this.edit.priority = false"
          :onFocus="() => this.edit.priority = true"
          :options="priorityOptions"
        />
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Completed:</span>
        <span class="featureDetails_detailsText" v-if="feature.endDate">
          {{ feature.endDate | date }}
          {{ feature.endDate | time }}
        </span>
        <span class="featureDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Status:</span>
        <span class="featureDetails_detailsText-edit" v-if="!edit.status" @click="toggleEdit('status')">
          <i class="fas fa-circle" :class="feature.status" />
          {{ feature.status | capitalize }}
        </span>
        <SelectInput
          :class="'featureDetails_select'"
          v-if="edit.status"
          v-model="status"
          :onBlur="() => this.edit.status = false"
          :onFocus="() => this.edit.status = true"
          :options="statusOptions"
        />
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Version:</span>
        <span
          class="featureDetails_detailsText-edit"
          contenteditable="true"
          @input="handleTextInput('version', $event.target.value)"
        >
            {{ feature.version.title }}
        </span>
      </div>
    </div>
    <h3 class="featureDetails_linksTitle">Links</h3>
    <div class="featureDetails_links" v-if="feature.links && feature.links.length > 0">
      <div class="featureDetails_linkList" v-for="(link, index) in feature.links" :key="index">
        <a class="featureDetails_link" :href="link" target="_blank">{{ link }}</a>
      </div>
    </div>
    <div class="featureDetails_linkList" v-else>
      <p class="featureDetails_noLinks">No links</p>
    </div>
    <div class="featureDetails_description">
      <h3 class="featureDetails_descriptionLabel">Description</h3>
      <p 
        class="featureDetails_descriptionText featureDetails_detailsText-edit"
        contenteditable="true"
        @input="handleTextInput('description', $event.target.value)"
      >
        {{ feature.description }}
      </p>
    </div>
    <h3 class="featureDetails_itemsTitle">Items</h3>
    <div class="featureDetails_items" v-if="feature.items.length > 0">
      <router-link class="featureDetails_itemDetails" to="#" v-for="item in feature.items" :key="item.id">
        <span class="featureDetails_itemTitle">{{ item.title }}</span>
        <span class="featureDetails_itemDate">
          Last Updated: {{ item.updatedDate | date }} {{ item.updatedDate | time }}
        </span>
      </router-link>
    </div>
    <div class="featureDetails_items" v-else>
      <p class="featureDetails_itemDetails">No items</p>
    </div>
    <h3 class="featureDetails_commentsTitle">Comments</h3>
    <div class="featureDetails_comments" v-if="feature.comments && feature.comments.length > 0">
      <div class="featureDetails_commentDetails" v-for="comment in feature.comments" :key="comment.startDate.toString()">
        <span class="featureDetails_commentUser">
          <i class="fas fa-user-circle featureDetails_details-userIcon" />
          {{ comment.user | name }} commented on
        </span>
        <span class="featureDetails_commentDate">
          {{ comment.startDate | date }}
          {{ comment.startDate | time }}
        </span>
        <p
          class="featureDetails_commentText"
          contenteditable="true"
          @input="handleTextInput('comment', $event.target.value)"
        >
          {{ comment.text }}
        </p>
      </div>
    </div>
    <div class="featureDetails_comments" v-else>
      <p class="featureDetails_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import { Feature, priorityType, statusType, User } from '@/types';
import { priorityOptions, statusOptions } from '@/utils/constants';

export default {
  components: {
    Dialog,
    SelectInput,
  },
  props: {
    feature: {} as Feature,
    closeDetails: Function,
  },
  data: () => ({
    assignee: {} as User,
    comment: String,
    description: String,
    edit: {
      assignee: false,
      priority: false,
      reporter: false,
      status: false,
    },
    link: String,
    reporter: {} as User,
    priority: 'blocker' as priorityType,
    priorityOptions,
    show: false,
    status: 'todo' as statusType,
    statusOptions,
    users: [] as User[],
    version: String,
  }),
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    handleTextInput(this: any, type: string, value: string) {
      this.$emit('input', value);
      if (type === 'comment') {
        this.comment = value;
      } else if (type === 'description') {
        this.description = value;
      } else if (type === 'link') {
        this.link = value;
      } else if (type === 'version') {
        this.version = value;
      }
    },
    toggleEdit(this: any, type: string) {
      if (type === 'assignee') {
        this.edit = {
          assignee: !this.edit.assignee,
          priority: false,
          reporter: false,
          status: false,
        };
      } else if (type === 'priority') {
        this.edit = {
          assignee: false,
          priority: !this.edit.priority,
          reporter: false,
          status: false,
        };
      } else if (type === 'reporter') {
        this.edit = {
          assignee: false,
          priority: false,
          reporter: !this.edit.reporter,
          status: false,
        };
      } else if (type === 'status') {
        this.edit = {
          assignee: false,
          priority: false,
          reporter: false,
          status: !this.edit.status,
        };
      }
    },
  },
  watch: {
    assignee(this: any) {
      this.edit = {
        ...this.edit,
        assignee: !this.edit.assignee,
      };
    },
    priority(this: any) {
      this.edit = {
        ...this.edit,
        priority: !this.edit.priority,
      };
    },
    reporter(this: any) {
      this.edit = {
        ...this.edit,
        reporter: !this.edit.reporter,
      };
    },
    status(this: any) {
      this.edit = {
        ...this.edit,
        status: !this.edit.status,
      };
    },
  },
};
</script>
