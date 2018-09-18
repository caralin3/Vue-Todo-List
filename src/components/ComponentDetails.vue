<template>
  <div class="compDetails">
    <div class="compDetails_header">
      <h2 class="compDetails_title">
        <span
          class="compDetails_detailsText-edit"
          contenteditable="true"
          @blur="handleTextChange('title', $event.target.innerText)"
        >
          {{ comp.title }}
        </span>
        <i class="fa-stack fa-2x comp">
          <i class="fas fa-square fa-stack-2x comp-square" />
          <i class="fas fa-code fa-stack-1x fa-inverse" />
        </i>
      </h2>
      <div class="compDetails_buttons">
        <button class="compDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="compDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="compDetails_comments" v-if="comp.workFlow.length > 0 && show">
      <h3 class="compDetails_commentsTitle">Workflow</h3>
      <!-- <div class="compDetails_compDetails" v-for="status in comp.workFlow" :key="status.startDate.toString()">
        <p class="compDetails_compTitle">{{ status.status }}</p>
        <span class="compDetails_compDate">{{ status.startDate | date }}</span>
      </div> -->
    </div>
    <h3 class="compDetails_subTitle">Details</h3>
    <div class="compDetails_details">
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Assignee:</span>
        <span class="compDetails_detailsText-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <span v-if="assignee.firstName === 'Select'">
            <i class="fas fa-user-circle compDetails_details-userIcon" />
            {{ comp.assignee | name }}
          </span>
          <span v-else>
            <i class="fas fa-user-circle compDetails_details-userIcon" />
            {{ assignee | name }}
          </span>
        </span>
        <SelectUserInput
          :class="'compDetails_select'"
          v-if="edit.assignee"
          v-model="assigneeId"
          :onBlur="() => this.edit.assignee = false"
          :onFocus="() => this.edit.assignee = true"
          :options="userOptions"
        />
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Created:</span>
        <span class="compDetails_detailsText">
          {{ comp.startDate | date }}
          {{ comp.startDate | time }}
        </span>
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Reporter:</span>
        <span class="compDetails_detailsText-edit" v-if="!edit.reporter" @click="toggleEdit('reporter')">
          <span v-if="reporter === 'Select'">
            <span v-if="comp.reporter">
              <i class="fas fa-user-circle compDetails_details-userIcon" />
              {{ comp.reporter | name }}
            </span>
            <span v-else>
              <i class="fas fa-user-circle compDetails_details-userIcon" />
              {{ reporter | name }}
            </span>
          </span>
          <span v-else> None</span>
        </span>
        <SelectUserInput
          :class="'compDetails_select'"
          v-if="edit.reporter"
          v-model="reporterId"
          :onBlur="() => this.edit.reporter = false"
          :onFocus="() => this.edit.reporter = true"
          :options="userOptions"
        />
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Updated:</span>
        <span class="compDetails_detailsText">
          {{ comp.updatedDate | date }}
          {{ comp.updatedDate | time }}
        </span>
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Priority:</span>
        <span class="compDetails_detailsText-edit" v-if="!edit.priority" @click="toggleEdit('priority')">
           <span v-if="priority === 'Select Priority'">
            <i class="fas fa-ban" :class="comp.priority" v-if="comp.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="comp.priority" v-if="comp.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="comp.priority" v-if="comp.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="comp.priority" v-if="comp.priority === 'minor'" />
            {{ comp.priority | capitalize }}
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
          :class="'compDetails_select'"
          v-if="edit.priority"
          v-model="priority"
          :onBlur="() => this.edit.priority = false"
          :onFocus="() => this.edit.priority = true"
          :options="priorityOptions"
        />
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Completed:</span>
        <span class="compDetails_detailsText" v-if="comp.endDate">
          {{ comp.endDate | date }}
          {{ comp.endDate | time }}
        </span>
        <span class="compDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Status:</span>
        <span class="compDetails_detailsText-edit" v-if="!edit.status" @click="toggleEdit('status')">
          <span v-if="status === 'Select Status'">
            <i class="fas fa-circle" :class="comp.status" />
            {{ comp.status | capitalize }}
          </span>
          <span v-else>
            <i class="fas fa-circle" :class="status" />
            {{ status | capitalize }}
          </span>
        </span>
        <SelectInput
          :class="'compDetails_select'"
          v-if="edit.status"
          v-model="status"
          :onBlur="() => this.edit.status = false"
          :onFocus="() => this.edit.status = true"
          :options="statusOptions"
        />
      </div>
      <div class="compDetails_detailsData">
        <span class="compDetails_detailsLabel">Version:</span>
        <span>
          {{ comp.version.title }}
        </span>
      </div>
    </div>
    <div class="compDetails_description">
      <h3 class="compDetails_subTitle">Description</h3>
      <p 
        class="compDetails_descriptionText compDetails_detailsText-edit"
        contenteditable="true"
        @blur="handleTextChange('description', $event.target.innerText)"
      >
        {{ comp.description }}
      </p>
    </div>
    <span class="featureDetails_subtitle">
      <h3 class="featureDetails_subtitle-title">Links</h3>
      <i class="fas fa-plus featureDetails_subtitle-add" />
    </span>
    <div class="compDetails_links" v-if="compLinks && compLinks.length > 0">
      <div class="compDetails_linkList" v-for="link in compLinks" :key="link.id">
          <div class="compDetails_linkRow"
            :class="{'compDetails_linkRow-border': edit.link.editing && edit.link.id === link.id}"
            :contenteditable="edit.link.editing && edit.link.id === link.id"
            @blur="handleLinkChange($event.target.innerText, link)"
          >
            <a class="compDetails_link" :href="updatedLink.to ? updatedLink.to : link.to" target="_blank">{{ link.to }}</a>
            <i class="fas fa-edit compDetails_linkEdit" v-if="!edit.link.editing" @click="toggleEditLink(link.id)" />
          </div>
      </div>
    </div>
    <div class="compDetails_linkList" v-else>
      <p class="compDetails_noLinks">No links</p>
    </div>
    <h3 class="compDetails_subTitle">Feature</h3>
    <div class="compDetails_feature">
      <router-link
        class="compDetails_featureDetails"
        :projId="projId"
        :to="{ path: '/projects/' + projId, query: { filter: 'features'}}"
        :key="compFeature.id"
      >
        <span class="compDetails_featureText">
          <i class="fas fa-list-alt feature" />
          <span class="compDetails_featureTitle">{{ compFeature.title }}</span>
        </span>
        <span class="compDetails_featureDate">
          Updated: {{ compFeature.updatedDate | date }} {{ compFeature.updatedDate | time }}
        </span>
      </router-link>
    </div>
    <span class="featureDetails_subtitle">
      <h3 class="featureDetails_subtitle-title">Comments</h3>
      <i class="fas fa-plus featureDetails_subtitle-add" />
    </span>
    <div class="compDetails_comments" v-if="compComments && compComments.length > 0">
      <div class="compDetails_commentDetails" v-for="comment in compComments" :key="comment.id">
        <span class="compDetails_commentUser">
          <i class="fas fa-user-circle compDetails_details-userIcon" />
          <span class="compDetails_commentUsername">
            {{ comment.user | name }}
          </span>
          commented on
        </span>
        <span class="compDetails_commentDate">
          {{ comment.startDate | date }}
          {{ comment.startDate | time }}
        </span>
        <span v-if="updatedComment.updatedDate || comment.updatedDate">
            updated on
        </span>
        <span class="compDetails_commentDate" v-if="updatedComment.updatedDate && !comment.updatedDate">
          {{ updatedComment.updatedDate | date }}
          {{ updatedComment.updatedDate | time }}
        </span>
        <span class="compDetails_commentDate" v-if="updatedComment.updatedDate || comment.updatedDate">
          {{ comment.updatedDate | date }}
          {{ comment.updatedDate | time }}
        </span>
        <p
          class="compDetails_commentText"
          contenteditable="true"
          @blur="handleCommentChange($event.target.innerText, comment)"
        >
          {{ comment.text }}
        </p>
      </div>
    </div>
    <div class="compDetails_comments" v-else>
      <p class="compDetails_noComments">No comments</p>
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
    this.loadCompState();
    this.userOptions = getUserOptions();
  },
  components: {
    Dialog,
    SelectInput,
    SelectUserInput,
  },
  props: {
    comp: {},
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
    compComments: [] as Comment[],
    compFeature: {} as Feature,
    compLinks: [] as Link[],
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
    initalizeCompArrays(ids: string[], stateArray: any[], compArray: any[]) {
      for (const id of ids) {
        for (const v of stateArray) {
          if (v.id === id) {
            compArray.push(v);
          }
        }
      }
    },
    loadCompState(this: any) {
      const index: number = this.items.findIndex((c: Item) => c.id === this.comp.id && c.type === this.comp.type);
      const featureId = this.items[index].featureId;
      this.updatedItem = this.items[index];
      this.compComments = [];
      this.compLinks = [];
      if (this.items[index].comments) {
        const commentIds = this.items[index].comments;
        this.initalizeCompArrays(commentIds, this.comments, this.compComments);
      }
      if (this.items[index].links) {
        const linkIds = this.items[index].links;
        this.initalizeCompArrays(linkIds, this.links, this.compLinks);
      }
      this.compFeature = this.features.filter((f: Feature) => f.id === featureId)[0];
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
    comp(this: any) {
      this.loadCompState();
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
