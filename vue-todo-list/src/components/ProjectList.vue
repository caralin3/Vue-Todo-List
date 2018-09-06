<template>
  <div class="projectList">
    <div class="projectList_header">
      <div class="projectList_text">
        <h1 class="projectList_title">Projects</h1>
        <h2 class="projectList_count">({{ projectCount }})</h2>
      </div>
      <!-- <button type="button" v-on:click="removeProject()">+</button> -->
      <button class="projectList_button" type="button" v-on:click="addProject()">New Project</button>
    </div>
    <ul class="projectList_list" v-for="(proj, index) in projects" v-bind:key="index">
      <li class="projectItem">
        <span class="projectItem_title">{{ proj.title }}</span>
        <span class="projectItem_status">Status: {{ proj.status | capitalize }}</span>
        <p class="projectItem_description">{{ proj.description }}</p>
        <span class="projectItem_by">Created by: {{ proj.creator | name }}</span>
        <span class="projectItem_date">Created on: {{ proj.startDate | date }}</span>
        <div class="projectItem_latest">
          <h3>Latest Updates</h3>
          {{ proj.features[0].title }}
          Status: {{ proj.features[0].status }}
          <span class="projectItem_latestDate">Last Updated: {{ proj.features[0].updatedDate | date }}</span>
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
  methods: {
    ...mapActions('projects', [
      'addProject',
      'removeProject',
    ]),
  },
};
</script>
