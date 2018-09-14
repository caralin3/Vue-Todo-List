<template>
  <div class="projectList">
    <ul class="projectList_list" v-for="(proj, index) in projects" v-bind:key="index">
      <li class="projectItem">
        <div class="projectItem_overlay">
          <router-link class="projectItem_link" :to="'/projects/' + proj.id">View Project</router-link>
        </div>
        <div class="projectItem_details">
          <div class="projectItem_header">
            <h3 class="projectItem_title">{{ proj.title }}</h3>
            <span class="projectItem_status">Status: {{ proj.status | capitalize }}</span>
          </div>
          <div class="projectItem_created">
            <span class="projectItem_by">Created by: {{ proj.creator | name }}</span>
            <span class="projectItem_date">Created on: {{ proj.startDate | date }}</span>
          </div>
          <p class="projectItem_description" v-if="proj.description !== ''">{{ proj.description }}</p>
          <p class="projectItem_description" v-else>No description</p>
          <div class="projectItem_latest" v-if="proj.features.length > 0">
            <h5 class="projectItem_latestTitle">Latest Update</h5>
            <div class="projectItem_featureDetails">
              <div class="projectItem_featureTitle">{{ proj.features[0].title }}</div>
              <div class="projectItem_featureDate">Last Updated: {{ proj.features[0].updatedDate | date }}</div>
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
