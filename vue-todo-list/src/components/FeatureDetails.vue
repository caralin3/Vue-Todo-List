<template>
  <div class="featureDetails">
    <div class="featureDetails_header">
      <h2 class="featureDetails_title">
        <span
          class="featureDetails_detailsText-edit"
          contenteditable="true"
          @blur="handleTextChange('title', $event.target.innerText)"
        >
          {{ feature.title }}
        </span>
        <i class="fas fa-list-alt feature" />
      </h2>
      <div class="featureDetails_buttons">
        <button class="featureDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="featureDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="featureDetails_comments" v-if="feature.workFlow.length > 0 && show">
      <h3 class="featureDetails_commentsTitle">Workflow</h3>
      <!-- <div class="featureDetails_featureDetails" v-for="status in feature.workFlow" :key="status.startDate.toString()">
        <p class="featureDetails_featureTitle">{{ status.status }}</p>
        <span class="featureDetails_featureDate">{{ status.startDate | date }}</span>
      </div> -->
    </div>
    <h3 class="featureDetails_subTitle">Details</h3>
    <div class="featureDetails_details">
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Assignee:</span>
        <span class="featureDetails_detailsText-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <span v-if="assignee.first === 'Select User'">
            <i class="fas fa-user-circle featureDetails_details-userIcon" />
            {{ feature.assignee | name }}
          </span>
          <span v-else>
            <i class="fas fa-user-circle featureDetails_details-userIcon" />
            {{ assignee | name }}
          </span>
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
          <span v-if="reporter === 'Select User'">
            <span v-if="feature.reporter">
              <i class="fas fa-user-circle featureDetails_details-userIcon" />
              {{ feature.reporter | name }}
            </span>
            <span v-else>
              <i class="fas fa-user-circle featureDetails_details-userIcon" />
              {{ reporter | name }}
            </span>
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
           <span v-if="priority === 'Select Priority'">
            <i class="fas fa-ban" :class="feature.priority" v-if="feature.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="feature.priority" v-if="feature.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="feature.priority" v-if="feature.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="feature.priority" v-if="feature.priority === 'minor'" />
            {{ feature.priority | capitalize }}
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
          <span v-if="status === 'Select Status'">
            <i class="fas fa-circle" :class="feature.status" />
            {{ feature.status | capitalize }}
          </span>
          <span v-else>
            <i class="fas fa-circle" :class="status" />
            {{ status | capitalize }}
          </span>
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
        <span>
          {{ feature.version.title }}
        </span>
      </div>
    </div>
    <h3 class="featureDetails_subTitle">Links</h3>
    <div class="featureDetails_links" v-if="featureLinks && featureLinks.length > 0">
      <div class="featureDetails_linkList" v-for="(link, index) in featureLinks" :key="index">
          <div class="featureDetails_linkRow"
            :class="{'featureDetails_linkRow-border': edit.link.editing && edit.link.id === link.id}"
            :contenteditable="edit.link.editing && edit.link.id === link.id"
            @blur="handleLinkChange($event.target.innerText, link)"
          >
            <a class="featureDetails_link" :href="updatedLink.to ? updatedLink.to : link.to" target="_blank">{{ link.to }}</a>
            <i class="fas fa-edit featureDetails_linkEdit" v-if="!edit.link.editing" @click="toggleEditLink(link.id)" />
          </div>
      </div>
    </div>
    <div class="featureDetails_linkList" v-else>
      <p class="featureDetails_noLinks">No links</p>
    </div>
    <div class="featureDetails_description">
      <h3 class="featureDetails_subTitle">Description</h3>
      <p 
        class="featureDetails_descriptionText featureDetails_detailsText-edit"
        contenteditable="true"
        @blur="handleTextChange('description', $event.target.innerText)"
      >
        {{ feature.description }}
      </p>
    </div>
    <h3 class="featureDetails_subTitle">Items</h3>
    <div class="featureDetails_items" v-if="featureItems.length > 0">
      <router-link
        class="featureDetails_itemDetails"
        v-for="item in featureItems"
        :projId="projId"
        :to="{ path: '/projects/' + projId, query: { filter: item.type + 's'}}"
        :key="item.id"
      >
        <span class="featureDetails_itemText">
          <i class="fa-stack fa-2x featureDetails_bug" v-if="item.type === 'bug'">
            <i class="fas fa-square fa-stack-2x featureDetails_bug-square" />
            <i class="fas fa-circle fa-stack-1x fa-inverse" />
          </i>
          <i class="fa-stack fa-2x featureDetails_comp" v-if="item.type === 'component'">
            <i class="fas fa-square fa-stack-2x featureDetails_comp-square" />
            <i class="fas fa-code fa-stack-1x fa-inverse" />
          </i>
          <i class="fas fa-check-square featureDetails_task" v-if="item.type === 'task'" />
          <span class="featureDetails_itemTitle">{{ item.title }}</span>
        </span>
        <span class="featureDetails_itemDate">
          Updated: {{ item.updatedDate | date }} {{ item.updatedDate | time }}
        </span>
      </router-link>
    </div>
    <div class="featureDetails_items" v-else>
      <p>No items</p>
    </div>
    <h3 class="featureDetails_subTitle">Comments</h3>
    <div class="featureDetails_comments" v-if="featureComments && featureComments.length > 0">
      <div class="featureDetails_commentDetails" v-for="comment in featureComments" :key="comment.id">
        <span class="featureDetails_commentUser">
          <i class="fas fa-user-circle featureDetails_details-userIcon" />
          <span class="featureDetails_commentUsername">
            {{ comment.user | name }}
          </span>
          commented on
        </span>
        <span class="featureDetails_commentDate">
          {{ comment.startDate | date }}
          {{ comment.startDate | time }}
        </span>
        <span v-if="comment.updatedDate">
          updated on
        </span>
        <span class="featureDetails_commentDate" v-if="comment.updatedDate">
          {{ comment.updatedDate | date }}
          {{ comment.updatedDate | time }}
        </span>
        <p
          class="featureDetails_commentText"
          contenteditable="true"
          @blur="handleCommentChange($event.target.innerText, comment)"
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
import { mapActions, mapState } from 'vuex';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import { Comment, Feature, Item, Link, priorityType, statusType, User } from '@/types';
import { priorityOptions, statusOptions } from '@/utils/constants';

export default {
  created(this: any) {
    this.projId = this.$route.params.id;
    this.loadFeatureState();
  },
  components: {
    Dialog,
    SelectInput,
  },
  props: {
    feature: {},
    closeDetails: Function,
  },
  data: () => ({
    assignee: {
      first: 'Select User',
      id: '0',
      email: '',
      last: '',
    } as User,
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
    featureComments: [] as Comment[],
    featureItems: [] as Item[],
    featureLinks: [] as Link[],
    projId: String,
    reporter: {
      first: 'Select User',
      id: '0',
      email: '',
      last: '',
    } as User,
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    show: false,
    status: 'Select Status' as statusType,
    statusOptions,
    title: String,
    updatedItem: {} as Item,
    updatedFeature: {} as Feature,
    updatedLink: {} as Link,
    users: [] as User[],
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
      editFeature: 'features/editFeature',
      editLink: 'links/editLink',
    }),
    initalizeFeatureArrays(ids: string[], stateArray: any[], featureArray: any[]) {
      for (const id of ids) {
        for (const v of stateArray) {
          if (v.id === id) {
            featureArray.push(v);
          }
        }
      }
    },
    loadFeatureState(this: any) {
      const index: number = this.features.findIndex((f: any) => f.id === this.feature.id);
      const itemIds = this.features[index].items;
      const commentIds = this.features[index].comments;
      const linkIds = this.features[index].links;

      this.updatedFeature = this.features[index];
      this.featureComments = [];
      this.featureItems = [];
      this.featureLinks = [];

      this.initalizeFeatureArrays(commentIds, this.comments, this.featureComments);
      this.initalizeFeatureArrays(itemIds, this.items, this.featureItems);
      this.initalizeFeatureArrays(linkIds, this.links, this.featureLinks);
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
        this.updatedFeature = {
          ...this.updatedFeature,
          description: value,
          updatedDate: new Date(),
        };
      } else if (type === 'title') {
        this.updatedFeature = {
          ...this.updatedFeature,
          title: value,
          updatedDate: new Date(),
        };
      }
      this.editFeature(this.updatedFeature);
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
    assignee(this: any) {
      this.edit.assignee = !this.edit.assignee;
      // TODO edit assignee
      // this.updatedFeature = {
      //   ...this.updatedFeature,
      //   assignee: this.assignee,
      //   updatedDate: new Date(),
      // };
      // this.editFeature(this.updatedFeature);
    },
    feature(this: any) {
      this.loadFeatureState();
    },
    priority(this: any) {
      this.edit.priority = !this.edit.priority;
      this.updatedFeature = {
        ...this.updatedFeature,
        priority: this.priority,
        updatedDate: new Date(),
      };
      this.editFeature(this.updatedFeature);
    },
    reporter(this: any) {
      this.edit.reporter = !this.edit.reporter;
      // TODO edit reporter
    },
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.updatedFeature = {
        ...this.updatedFeature,
        status: this.status,
        updatedDate: new Date(),
      };
      this.editFeature(this.updatedFeature);
    },
  },
};
</script>
