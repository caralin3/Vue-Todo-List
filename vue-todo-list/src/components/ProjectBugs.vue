<template>
  <div class="projectBugs">
    <div class="projectBugs_header">
      <ProjectHeader title="Bugs" buttonText="Add Bug" :toggleDialog="toggleDialog" />
    </div>
    <ul class="projectBugs_list" v-if="bugs.length > 0 && !openDetails">
      <li class="projectBug" v-for="bug in bugs" v-bind:key="bug.id">
        <div class="projectBug_overlay" @click="clickFeature(bug)">
          <!-- <router-link class="projectBug_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'features', id: bug.id}}"> -->
          <router-link class="projectBug_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'bugs'}}">
            View Bug
          </router-link>
        </div>
        <div class="projectBug_details">
          <h3 class="projectBug_title">{{ bug.title }}</h3>
          <span class="projectBug_date">{{ bug.updatedDate | date }} {{ bug.updatedDate | time }}</span>
          <span class="projectBug_priority">Priority: {{ bug.priority | capitalize }}</span>
          <span class="projectBugs_status">Status: {{ bug.status | capitalize }}</span>
        </div>
      </li>
    </ul>
    <div class="projectBugs_empty" v-if="bugs.length === 0 && !openDetails">
      <h4>No bugs to display</h4>
    </div>
    <div class="projectBugs_details" v-if="openDetails">
      <BugDetails :bug="bug" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import BugDetails from '@/components/BugDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    BugDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    const features: Feature[] = this.projects[index].features;
    for (let feature of features) {
      const items: Item[] = feature.items;
      for (let item of items) {
        if (item.type === 'bug') {
          this.tasks.push(item);
        }
      }
    }
  },
  data: () => ({
    bugs: [],
    id: String,
    openDetails: false,
    show: false,
  }),
  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    toggleDetails(this: any) {
      this.openDetails = !this.openDetails;
    },
    clickFeature(this: any, bug: Item) {
      console.log(bug);
      this.toggleDetails();
      // if (!this.openDetails) {
      //   this.$router.go(-1);
      // }
    },
  },
};
</script>
