<template>
  <div class="bugDetails">
    <div class="bugDetails_header">
      <h2 class="bugDetails_title">
        <span
          class="bugDetails_detailsText-edit"
          contenteditable="true"
          @blur="handleTextChange('title', $event.target.innerText)"
        >
          {{ bug.title }}
        </span>
        <i class="fa-stack fa-2x bug">
          <i class="fas fa-square fa-stack-2x bug-square" />
          <i class="fas fa-circle fa-stack-1x fa-inverse" />
        </i>
      </h2>
      <div class="bugDetails_buttons">
        <button class="bugDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="bugDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="bugDetails_comments" v-if="bug.workFlow.length > 0 && show">
      <h3 class="bugDetails_commentsTitle">Workflow</h3>
      <!-- <div class="bugDetails_bugDetails" v-for="status in bug.workFlow" :key="status.startDate.toString()">
        <p class="bugDetails_bugTitle">{{ status.status }}</p>
        <span class="bugDetails_bugDate">{{ status.startDate | date }}</span>
      </div> -->
    </div>
    <h3 class="bugDetails_subTitle">Details</h3>
    <div class="bugDetails_details">
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Assignee:</span>
        <span class="bugDetails_detailsText-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <span v-if="assignee.firstName === 'Select'">
            <i class="fas fa-user-circle bugDetails_details-userIcon" />
            {{ bug.assignee | name }}
          </span>
          <span v-else>
            <i class="fas fa-user-circle bugDetails_details-userIcon" />
            {{ assignee | name }}
          </span>
        </span>
        <SelectUserInput
          :class="'bugDetails_select'"
          v-if="edit.assignee"
          v-model="assigneeId"
          :onBlur="() => this.edit.assignee = false"
          :onFocus="() => this.edit.assignee = true"
          :options="userOptions"
        />
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Created:</span>
        <span class="bugDetails_detailsText">
          {{ bug.startDate | date }}
          {{ bug.startDate | time }}
        </span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Reporter:</span>
        <span class="bugDetails_detailsText-edit" v-if="!edit.reporter" @click="toggleEdit('reporter')">
          <span v-if="reporter === 'Select'">
            <span v-if="bug.reporter">
              <i class="fas fa-user-circle bugDetails_details-userIcon" />
              {{ bug.reporter | name }}
            </span>
            <span v-else>
              <i class="fas fa-user-circle bugDetails_details-userIcon" />
              {{ reporter | name }}
            </span>
          </span>
          <span v-else> None</span>
        </span>
        <SelectUserInput
          :class="'bugDetails_select'"
          v-if="edit.reporter"
          v-model="reporterId"
          :onBlur="() => this.edit.reporter = false"
          :onFocus="() => this.edit.reporter = true"
          :options="userOptions"
        />
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Updated:</span>
        <span class="bugDetails_detailsText">
          {{ bug.updatedDate | date }}
          {{ bug.updatedDate | time }}
        </span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Priority:</span>
        <span class="bugDetails_detailsText-edit" v-if="!edit.priority" @click="toggleEdit('priority')">
           <span v-if="priority === 'Select Priority'">
            <i class="fas fa-ban" :class="bug.priority" v-if="bug.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="bug.priority" v-if="bug.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="bug.priority" v-if="bug.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="bug.priority" v-if="bug.priority === 'minor'" />
            {{ bug.priority | capitalize }}
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
          :class="'bugDetails_select'"
          v-if="edit.priority"
          v-model="priority"
          :onBlur="() => this.edit.priority = false"
          :onFocus="() => this.edit.priority = true"
          :options="priorityOptions"
        />
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Bugleted:</span>
        <span class="bugDetails_detailsText" v-if="bug.endDate">
          {{ bug.endDate | date }}
          {{ bug.endDate | time }}
        </span>
        <span class="bugDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Status:</span>
        <span class="bugDetails_detailsText-edit" v-if="!edit.status" @click="toggleEdit('status')">
          <span v-if="status === 'Select Status'">
            <i class="fas fa-circle" :class="bug.status" />
            {{ bug.status | capitalize }}
          </span>
          <span v-else>
            <i class="fas fa-circle" :class="status" />
            {{ status | capitalize }}
          </span>
        </span>
        <SelectInput
          :class="'bugDetails_select'"
          v-if="edit.status"
          v-model="status"
          :onBlur="() => this.edit.status = false"
          :onFocus="() => this.edit.status = true"
          :options="statusOptions"
        />
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Version:</span>
        <span>
          {{ bug.version.title }}
        </span>
      </div>
    </div>
    <div class="bugDetails_description">
      <h3 class="bugDetails_subTitle">Description</h3>
      <p 
        class="bugDetails_descriptionText bugDetails_detailsText-edit"
        contenteditable="true"
        @blur="handleTextChange('description', $event.target.innerText)"
      >
        {{ bug.description }}
      </p>
    </div>
    <span class="featureDetails_subtitle">
      <h3 class="featureDetails_subtitle-title">Links</h3>
      <i class="fas fa-plus featureDetails_subtitle-add" />
    </span>
    <div class="bugDetails_links" v-if="bugLinks && bugLinks.length > 0">
      <div class="bugDetails_linkList" v-for="link in bugLinks" :key="link.id">
          <div class="bugDetails_linkRow"
            :class="{'bugDetails_linkRow-border': edit.link.editing && edit.link.id === link.id}"
            :contenteditable="edit.link.editing && edit.link.id === link.id"
            @blur="handleLinkChange($event.target.innerText, link)"
          >
            <a class="bugDetails_link" :href="updatedLink.to ? updatedLink.to : link.to" target="_blank">{{ link.to }}</a>
            <i class="fas fa-edit bugDetails_linkEdit" v-if="!edit.link.editing" @click="toggleEditLink(link.id)" />
          </div>
      </div>
    </div>
    <div class="bugDetails_linkList" v-else>
      <p class="bugDetails_noLinks">No links</p>
    </div>
    <h3 class="bugDetails_subTitle">Feature</h3>
    <div class="bugDetails_feature">
      <router-link
        class="bugDetails_featureDetails"
        :projId="projId"
        :to="{ path: '/projects/' + projId, query: { filter: 'features'}}"
        :key="bugFeature.id"
      >
        <span class="bugDetails_featureText">
          <i class="fas fa-list-alt feature" />
          <span class="bugDetails_featureTitle">{{ bugFeature.title }}</span>
        </span>
        <span class="bugDetails_featureDate">
          Updated: {{ bugFeature.updatedDate | date }} {{ bugFeature.updatedDate | time }}
        </span>
      </router-link>
    </div>
    <span class="featureDetails_subtitle">
      <h3 class="featureDetails_subtitle-title">Comments</h3>
      <i class="fas fa-plus featureDetails_subtitle-add" />
    </span>
    <div class="bugDetails_comments" v-if="bugComments && bugComments.length > 0">
      <div class="bugDetails_commentDetails" v-for="comment in bugComments" :key="comment.id">
        <span class="bugDetails_commentUser">
          <i class="fas fa-user-circle bugDetails_details-userIcon" />
          <span class="bugDetails_commentUsername">
            {{ comment.user | name }}
          </span>
          commented on
        </span>
        <span class="bugDetails_commentDate">
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
          class="bugDetails_commentText"
          contenteditable="true"
          @blur="handleCommentChange($event.target.innerText, comment)"
        >
          {{ comment.text }}
        </p>
      </div>
    </div>
    <div class="bugDetails_comments" v-else>
      <p class="bugDetails_noComments">No comments</p>
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
    this.loadBugState();
    this.userOptions = getUserOptions();
  },
  components: {
    Dialog,
    SelectInput,
    SelectUserInput,
  },
  props: {
    bug: {},
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
    bugComments: [] as Comment[],
    bugFeature: {} as Feature,
    bugLinks: [] as Link[],
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
    initalizeBugArrays(ids: string[], stateArray: any[], bugArray: any[]) {
      for (const id of ids) {
        for (const v of stateArray) {
          if (v.id === id) {
            bugArray.push(v);
          }
        }
      }
    },
    loadBugState(this: any) {
      const index: number = this.items.findIndex((b: Item) => b.id === this.bug.id && b.type === this.bug.type);
      const featureId = this.items[index].featureId;
      this.updatedItem = this.items[index];
      this.bugComments = [];
      this.bugLinks = [];
      if (this.items[index].comments) {
        const commentIds = this.items[index].comments;
        this.initalizeBugArrays(commentIds, this.comments, this.bugComments);
      }
      if (this.items[index].links) {
        const linkIds = this.items[index].links;
        this.initalizeBugArrays(linkIds, this.links, this.bugLinks);
      }
      this.bugFeature = this.features.filter((f: Feature) => f.id === featureId)[0];
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    handleCommentChange(this: any, value: string, comm: Comment) {
      this.updatedComment = {
        id: comm.id,
        startDate: comm.startDate.toString(),
        text: value,
        updatedDate: new Date().toString(),
        user: comm.user,
      };
      this.editComment(this.updatedComment);
    },
    handleLinkChange(this: any, value: string, link: Link) {
      this.updatedLink = {
        id: link.id,
        startDate: link.startDate.toString(),
        to: value,
        updatedDate: new Date().toString(),
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
          startDate: new Date(this.updatedItem.startDate).toString(),
          updatedDate: new Date().toString(),
        };
      } else if (type === 'title') {
        this.updatedItem = {
          ...this.updatedItem,
          startDate: new Date(this.updatedItem.startDate).toString(),
          title: value,
          updatedDate: new Date().toString(),
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
        startDate: new Date(this.updatedItem.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editItem(this.updatedItem);
    },
    bug(this: any) {
      this.loadBugState();
    },
    priority(this: any) {
      this.edit.priority = !this.edit.priority;
      this.updatedItem = {
        ...this.updatedItem,
        priority: this.priority,
        startDate: new Date(this.updatedItem.startDate).toString(),
        updatedDate: new Date().toString(),
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
        startDate: new Date(this.updatedItem.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editItem(this.updatedItem);
    },
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.updatedItem = {
        ...this.updatedItem,
        startDate: new Date(this.updatedItem.startDate).toString(),
        status: this.status,
        updatedDate: new Date().toString(),
      };
      this.editItem(this.updatedItem);
    },
  },
};
</script>
