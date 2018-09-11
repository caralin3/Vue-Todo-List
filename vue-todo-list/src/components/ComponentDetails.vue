<template>
  <div class="componentDetails">
    <div class="componentDetails_header">
      <h2 class="componentDetails_title">{{ component.title }}</h2>
      <div class="componentDetails_buttons">
        <button class="componentDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="componentDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="componentDetails_comments" v-if="component.workFlow.length > 0 && show">
      <h3 class="componentDetails_commentsTitle">Workflow</h3>
      <div class="componentDetails_componentDetails" v-for="status in component.workFlow" :key="status.startDate">
        <p class="componentDetails_componentTitle">{{ status.status }}</p>
        <span class="componentDetails_componentDate">{{ status.startDate | date }}</span>
      </div>
    </div>
    <h3 class="componentDetails_detailsTitle">Details</h3>
    <div class="componentDetails_details">
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Assignee:</span>
        <span class="componentDetails_detailsText">{{ component.assignee | name }}</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Created:</span>
        <span class="componentDetails_detailsText">{{ component.startDate | date }}</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Reporter:</span>
        <span class="componentDetails_detailsText" v-if="component.reporter">{{ component.reporter | name }}</span>
        <span class="componentDetails_detailsText" v-else>None</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Last Updated:</span>
        <span class="componentDetails_detailsText">{{ component.updatedDate | date }}</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Priority:</span>
        <span class="componentDetails_detailsText">{{ component.priority | capitalize }}</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Completed:</span>
        <span class="componentDetails_detailsText" v-if="component.endDate">{{ component.endDate | date }}</span>
        <span class="componentDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Status:</span>
        <span class="componentDetails_detailsText">{{ component.status | capitalize }}</span>
      </div>
      <div class="componentDetails_detailsData">
        <span class="componentDetails_detailsLabel">Version:</span>
        <span class="componentDetails_detailsText">{{ component.version.title }}</span>
      </div>
    </div>
    <div class="componentDetails_links" v-if="component.links && component.links.length > 0">
      <h3 class="componentDetails_linksTitle">Links</h3>
      <div class="componentDetails_linkList" v-for="(link, index) in component.links" :key="index">
        <a class="componentDetails_link" :href="link" target="_blank">{{ link }}</a>
      </div>
    </div>
    <div class="componentDetails_linksEmpty" v-else>
      <h3 class="componentDetails_linksTitle">Links</h3>
      <p class="componentDetails_noLinks">No links</p>
    </div>
    <div class="componentDetails_description">
      <h3 class="componentDetails_descriptionLabel">Description</h3>
      <p class="componentDetails_descriptionText">{{ component.description }}</p>
    </div>
    <div class="componentDetails_items" v-if="component.items.length > 0">
      <h3 class="componentDetails_itemsTitle">Items</h3>
      <div class="componentDetails_itemDetails" v-for="item in component.items" :key="item.id">
        <div class="componentDetails_itemTitle">{{ item.title }}</div>
        <div class="componentDetails_itemDate">
          Last Updated: {{ item.updatedDate | date }}
        </div>
      </div>
    </div>
    <div class="componentDetails_itemsEmpty" v-else>
      <h3 class="componentDetails_itemsTitle">Items</h3>
      <p class="componentDetails_noItems">No items</p>
    </div>
    <div class="componentDetails_comments" v-if="component.comments && component.comments.length > 0">
      <h3 class="componentDetails_commentsTitle">Comments</h3>
      <div class="componentDetails_componentDetails" v-for="comment in component.comments" :key="comment.startDate">
        <span class="componentDetails_componentTitle">{{ comment.user | name }}</span>
        <span class="componentDetails_componentDate">{{ comment.startDate | date }}</span>
        <p class="componentDetails_componentTitle">{{ comment.text }}</p>
      </div>
    </div>
    <div class="componentDetails_commentsEmpty" v-else>
      <h3 class="componentDetails_commentsTitle">Comments</h3>
      <p class="componentDetails_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item } from '@/types';

export default {
  props: {
    component: {},
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
