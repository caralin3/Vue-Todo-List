<template>
  <div class="taskDetails">
    <div class="taskDetails_header">
      <h2 class="taskDetails_title">{{ task.title }}</h2>
      <div class="taskDetails_buttons">
        <button class="taskDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="taskDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="taskDetails_comments" v-if="task.workFlow.length > 0 && show">
      <h3 class="taskDetails_commentsTitle">Workflow</h3>
      <div class="taskDetails_taskDetails" v-for="status in task.workFlow" :key="status.startDate">
        <p class="taskDetails_taskTitle">{{ status.status }}</p>
        <span class="taskDetails_taskDate">{{ status.startDate | date }}</span>
      </div>
    </div>
    <h3 class="taskDetails_detailsTitle">Details</h3>
    <div class="taskDetails_details">
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Assignee:</span>
        <span class="taskDetails_detailsText">{{ task.assignee | name }}</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Created:</span>
        <span class="taskDetails_detailsText">{{ task.startDate | date }}</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Reporter:</span>
        <span class="taskDetails_detailsText" v-if="task.reporter">{{ task.reporter | name }}</span>
        <span class="taskDetails_detailsText" v-else>None</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Last Updated:</span>
        <span class="taskDetails_detailsText">{{ task.updatedDate | date }}</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Priority:</span>
        <span class="taskDetails_detailsText">{{ task.priority | capitalize }}</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Completed:</span>
        <span class="taskDetails_detailsText" v-if="task.endDate">{{ task.endDate | date }}</span>
        <span class="taskDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Status:</span>
        <span class="taskDetails_detailsText">{{ task.status | capitalize }}</span>
      </div>
      <div class="taskDetails_detailsData">
        <span class="taskDetails_detailsLabel">Version:</span>
        <span class="taskDetails_detailsText">{{ task.version.title }}</span>
      </div>
    </div>
    <div class="taskDetails_links" v-if="task.links && task.links.length > 0">
      <h3 class="taskDetails_linksTitle">Links</h3>
      <div class="taskDetails_linkList" v-for="(link, index) in task.links" :key="index">
        <a class="taskDetails_link" :href="link" target="_blank">{{ link }}</a>
      </div>
    </div>
    <div class="taskDetails_linksEmpty" v-else>
      <h3 class="taskDetails_linksTitle">Links</h3>
      <p class="taskDetails_noLinks">No links</p>
    </div>
    <div class="taskDetails_description">
      <h3 class="taskDetails_descriptionLabel">Description</h3>
      <p class="taskDetails_descriptionText">{{ task.description }}</p>
    </div>
    <div class="taskDetails_items" v-if="task.items.length > 0">
      <h3 class="taskDetails_itemsTitle">Items</h3>
      <div class="taskDetails_itemDetails" v-for="item in task.items" :key="item.id">
        <div class="taskDetails_itemTitle">{{ item.title }}</div>
        <div class="taskDetails_itemDate">
          Last Updated: {{ item.updatedDate | date }}
        </div>
      </div>
    </div>
    <div class="taskDetails_itemsEmpty" v-else>
      <h3 class="taskDetails_itemsTitle">Items</h3>
      <p class="taskDetails_noItems">No items</p>
    </div>
    <div class="taskDetails_comments" v-if="task.comments && task.comments.length > 0">
      <h3 class="taskDetails_commentsTitle">Comments</h3>
      <div class="taskDetails_taskDetails" v-for="comment in task.comments" :key="comment.startDate">
        <span class="taskDetails_taskTitle">{{ comment.user | name }}</span>
        <span class="taskDetails_taskDate">{{ comment.startDate | date }}</span>
        <p class="taskDetails_taskTitle">{{ comment.text }}</p>
      </div>
    </div>
    <div class="taskDetails_commentsEmpty" v-else>
      <h3 class="taskDetails_commentsTitle">Comments</h3>
      <p class="taskDetails_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item } from '@/types';

export default {
  props: {
    task: {},
    closeDetails: Function,
  },
  data: () => ({
    show: false,
  }),
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },
};
</script>
