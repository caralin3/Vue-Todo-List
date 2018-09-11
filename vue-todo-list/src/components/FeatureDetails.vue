<template>
  <div class="featureDetails">
    <div class="featureDetails_header">
      <h2 class="featureDetails_title">{{ feature.title }}</h2>
      <div class="featureDetails_buttons">
        <button class="featureDetails_workflowButton" type="button" @click="toggleDialog">View Workflow</button>
        <i class="featureDetails_closeButton fas fa-times" @click="closeDetails" />
      </div>
    </div>
    <div class="featureDetails_comments" v-if="feature.workFlow.length > 0 && show">
      <h3 class="featureDetails_commentsTitle">Workflow</h3>
      <div class="featureDetails_featureDetails" v-for="status in feature.workFlow" :key="status.startDate">
        <p class="featureDetails_featureTitle">{{ status.status }}</p>
        <span class="featureDetails_featureDate">{{ status.startDate | date }}</span>
      </div>
    </div>
    <h3 class="featureDetails_detailsTitle">Details</h3>
    <div class="featureDetails_details">
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Assignee:</span>
        <span class="featureDetails_detailsText">{{ feature.assignee | name }}</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Created:</span>
        <span class="featureDetails_detailsText">{{ feature.startDate | date }}</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Reporter:</span>
        <span class="featureDetails_detailsText" v-if="feature.reporter">{{ feature.reporter | name }}</span>
        <span class="featureDetails_detailsText" v-else>None</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Last Updated:</span>
        <span class="featureDetails_detailsText">{{ feature.updatedDate | date }}</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Priority:</span>
        <span class="featureDetails_detailsText">{{ feature.priority | capitalize }}</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Completed:</span>
        <span class="featureDetails_detailsText" v-if="feature.endDate">{{ feature.endDate | date }}</span>
        <span class="featureDetails_detailsText" v-else>TBD</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Status:</span>
        <span class="featureDetails_detailsText">{{ feature.status | capitalize }}</span>
      </div>
      <div class="featureDetails_detailsData">
        <span class="featureDetails_detailsLabel">Version:</span>
        <span class="featureDetails_detailsText">{{ feature.version.title }}</span>
      </div>
    </div>
    <div class="featureDetails_links" v-if="feature.links && feature.links.length > 0">
      <h3 class="featureDetails_linksTitle">Links</h3>
      <div class="featureDetails_linkList" v-for="(link, index) in feature.links" :key="index">
        <a class="featureDetails_link" :href="link" target="_blank">{{ link }}</a>
      </div>
    </div>
    <div class="featureDetails_linksEmpty" v-else>
      <h3 class="featureDetails_linksTitle">Links</h3>
      <p class="featureDetails_noLinks">No links</p>
    </div>
    <div class="featureDetails_description">
      <h3 class="featureDetails_descriptionLabel">Description</h3>
      <p class="featureDetails_descriptionText">{{ feature.description }}</p>
    </div>
    <div class="featureDetails_items" v-if="feature.items.length > 0">
      <h3 class="featureDetails_itemsTitle">Items</h3>
      <div class="featureDetails_itemDetails" v-for="item in feature.items" :key="item.id">
        <div class="featureDetails_itemTitle">{{ item.title }}</div>
        <div class="featureDetails_itemDate">
          Last Updated: {{ item.updatedDate | date }}
        </div>
      </div>
    </div>
    <div class="featureDetails_itemsEmpty" v-else>
      <h3 class="featureDetails_itemsTitle">Items</h3>
      <p class="featureDetails_noItems">No items</p>
    </div>
    <div class="featureDetails_comments" v-if="feature.comments && feature.comments.length > 0">
      <h3 class="featureDetails_commentsTitle">Comments</h3>
      <div class="featureDetails_featureDetails" v-for="comment in feature.comments" :key="comment.startDate">
        <span class="featureDetails_featureTitle">{{ comment.user | name }}</span>
        <span class="featureDetails_featureDate">{{ comment.startDate | date }}</span>
        <p class="featureDetails_featureTitle">{{ comment.text }}</p>
      </div>
    </div>
    <div class="featureDetails_commentsEmpty" v-else>
      <h3 class="featureDetails_commentsTitle">Comments</h3>
      <p class="featureDetails_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
// import ProjectHeader from '@/components/ProjectHeader.vue';
import { Feature } from '@/types';

export default {
  components: {
    // ProjectHeader,
  },
  props: {
    feature: {} as Feature,
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
