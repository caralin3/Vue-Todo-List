<template>
  <div class="bugDetails">
    <div class="bugDetails_header">
      <h2 class="bugDetails_title">{{ bug.title }}</h2>
      <div class="bugDetails_buttons">
        <button class="bugDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="bugDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="bugDetails_comments" v-if="bug.workFlow.length > 0 && show">
      <h3 class="bugDetails_commentsTitle">Workflow</h3>
      <div class="bugDetails_bugDetails" v-for="status in bug.workFlow" :key="status.startDate">
        <p class="bugDetails_bugTitle">{{ status.status }}</p>
        <span class="bugDetails_bugDate">{{ status.startDate | date }}</span>
      </div>
    </div>
    <h3 class="bugDetails_detailsTitle">Details</h3>
    <div class="bugDetails_details">
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Assignee:</span>
        <span class="bugDetails_detailsText">{{ bug.assignee | name }}</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Created:</span>
        <span class="bugDetails_detailsText">{{ bug.startDate | date }}</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Reporter:</span>
        <span class="bugDetails_detailsText" v-if="bug.reporter">{{ bug.reporter | name }}</span>
        <span class="bugDetails_detailsText" v-else>None</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Last Updated:</span>
        <span class="bugDetails_detailsText">{{ bug.updatedDate | date }}</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Priority:</span>
        <span class="bugDetails_detailsText">{{ bug.priority | capitalize }}</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Completed:</span>
        <span class="bugDetails_detailsText" v-if="bug.endDate">{{ bug.endDate | date }}</span>
        <span class="bugDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Status:</span>
        <span class="bugDetails_detailsText">{{ bug.status | capitalize }}</span>
      </div>
      <div class="bugDetails_detailsData">
        <span class="bugDetails_detailsLabel">Version:</span>
        <span class="bugDetails_detailsText">{{ bug.version.title }}</span>
      </div>
    </div>
    <div class="bugDetails_links" v-if="bug.links && bug.links.length > 0">
      <h3 class="bugDetails_linksTitle">Links</h3>
      <div class="bugDetails_linkList" v-for="(link, index) in bug.links" :key="index">
        <a class="bugDetails_link" :href="link" target="_blank">{{ link }}</a>
      </div>
    </div>
    <div class="bugDetails_linksEmpty" v-else>
      <h3 class="bugDetails_linksTitle">Links</h3>
      <p class="bugDetails_noLinks">No links</p>
    </div>
    <div class="bugDetails_description">
      <h3 class="bugDetails_descriptionLabel">Description</h3>
      <p class="bugDetails_descriptionText">{{ bug.description }}</p>
    </div>
    <div class="bugDetails_items" v-if="bug.items.length > 0">
      <h3 class="bugDetails_itemsTitle">Items</h3>
      <div class="bugDetails_itemDetails" v-for="item in bug.items" :key="item.id">
        <div class="bugDetails_itemTitle">{{ item.title }}</div>
        <div class="bugDetails_itemDate">
          Last Updated: {{ item.updatedDate | date }}
        </div>
      </div>
    </div>
    <div class="bugDetails_itemsEmpty" v-else>
      <h3 class="bugDetails_itemsTitle">Items</h3>
      <p class="bugDetails_noItems">No items</p>
    </div>
    <div class="bugDetails_comments" v-if="bug.comments && bug.comments.length > 0">
      <h3 class="bugDetails_commentsTitle">Comments</h3>
      <div class="bugDetails_bugDetails" v-for="comment in bug.comments" :key="comment.startDate">
        <span class="bugDetails_bugTitle">{{ comment.user | name }}</span>
        <span class="bugDetails_bugDate">{{ comment.startDate | date }}</span>
        <p class="bugDetails_bugTitle">{{ comment.text }}</p>
      </div>
    </div>
    <div class="bugDetails_commentsEmpty" v-else>
      <h3 class="bugDetails_commentsTitle">Comments</h3>
      <p class="bugDetails_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Item } from '@/types';

export default {
  props: {
    bug: {},
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
