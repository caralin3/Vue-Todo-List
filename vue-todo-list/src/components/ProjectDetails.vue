<template>
  <div class="projectDetails">
    <h2 class="projectDetails_detailsLabel">{{ proj.title }}</h2>
    <div class="projectDetails_details">
      <h3 class="projectDetails_detailsLabel">Details</h3>
      <div class="projectDetails_detailsBy">Created by: {{ proj.creator | name }}</div>
      <div class="projectDetails_detailsDate">Created on: {{ proj.startDate | date }}</div>
      <div class="projectDetails_detailsStatus">Status: {{ proj.status | capitalize }}</div>
      <div class="projectDetails_description">
        <h3 class="projectDetails_descriptionLabel">Description</h3>
        <p class="projectDetails_descriptionText">{{ proj.description }}</p>
      </div>
      <div class="projectDetails_latest" v-if="proj.features.length > 0">
        <h5 class="projectDetails_latestTitle">Latest Updates</h5>
        <div class="projectDetails_featureDetails">
          <div class="projectDetails_featureTitle">{{ proj.features[0].title }}</div>
          <div class="projectDetails_featureDate">Last Updated: {{ proj.features[0].updatedDate | date }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    this.proj = this.projects[index];
  },
  data: () => ({
    id: String,
    proj: String,
  }),
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
  },
};
</script>
