<template>
  <div class="projectFeatures">
    <div class="projectFeatures_header">
      <ProjectHeader title="Features" buttonText="Add Feature" :toggleDialog="toggleDialog" />
    </div>
    <!-- <table class="projectFeatures_table" v-if="proj.features.length > 0">
      <thead>
        <tr>
          <th>Feature</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody v-for="feature in proj.features" v-bind:key="feature.id" @click="clickFeature(feature)">
        <tr class="projectFeatures_feature">
          <td>{{ feature.title }}</td>
          <td>{{ feature.priority | capitalize }}</td>
          <td>{{ feature.status | capitalize }}</td>
          <td>{{ feature.updatedDate | date }}</td>
        </tr>
      </tbody>
    </table> -->
    <ul class="projectFeatures_list" v-if="proj.features.length > 0 && !openDetails">
      <li class="projectFeature" v-for="feature in proj.features" v-bind:key="feature.id">
        <div class="projectFeature_overlay" @click="clickFeature(feature)">
          <!-- <router-link class="projectFeature_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'features', id: feature.id}}"> -->
          <router-link class="projectFeature_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'features'}}">
            View Feature
          </router-link>
        </div>
        <div class="projectFeature_details">
          <h3 class="projectFeature_title">{{ feature.title }}</h3>
          <span class="projectFeature_date">{{ feature.updatedDate | date }}</span>
          <span class="projectFeature_priority">Priority: {{ feature.priority | capitalize }}</span>
          <span class="projectFeatures_status">Status: {{ feature.status | capitalize }}</span>
        </div>
      </li>
    </ul>
    <div class="projectFeatures_empty" v-if="proj.features.length === 0 && !openDetails">
      <h4>No features to display</h4>
    </div>
    <div class="projectFeatures_details" v-if="openDetails">
      <FeatureDetails :feature="feature" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import FeatureDetails from '@/components/FeatureDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Feature, Project } from '@/types';

export default {
  components: {
    FeatureDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    this.proj = this.projects[index];
  },
  data: () => ({
    id: String,
    feature: {} as Feature,
    openDetails: false,
    proj: {} as Project,
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
    clickFeature(this: any, feature: Feature) {
      console.log(feature);
      this.toggleDetails();
      // if (!this.openDetails) {
      //   this.$router.go(-1);
      // }
      this.feature = feature;
    },
  },
};
</script>
