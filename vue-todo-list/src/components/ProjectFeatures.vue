<template>
  <div class="projectFeatures">
    <ul class="projectFeatures_list" v-for="(proj, index) in projects" v-bind:key="index">
      <li class="projectFeature">
        <div class="projectFeature_overlay">
          <router-link class="projectFeature_link" :to="'/projects/' + proj.id">View Project</router-link>
        </div>
        <div class="projectFeature_details">
          <div class="projectFeature_header">
            <h3 class="projectFeature_title">{{ proj.title }}</h3>
            <span class="projectFeature_status">Status: {{ proj.status | capitalize }}</span>
          </div>
          <div class="projectFeature_created">
            <span class="projectFeature_by">Created by: {{ proj.creator | name }}</span>
            <span class="projectFeature_date">Created on: {{ proj.startDate | date }}</span>
          </div>
          <p class="projectFeature_description">{{ proj.description }}</p>
          <div class="projectFeature_latest" v-if="proj.features.length > 0">
            <h5 class="projectFeature_latestTitle">Latest Update</h5>
            <div class="projectFeature_featureDetails">
              <div class="projectFeature_featureTitle">{{ proj.features[0].title }}</div>
              <div class="projectFeature_featureDate">Last Updated: {{ proj.features[0].updatedDate | date }}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
    ...mapGetters('projects', [
      'projectCount',
    ]),
  },
};
</script>
