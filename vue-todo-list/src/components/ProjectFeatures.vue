<template>
  <div class="projectFeatures"  :class="{'projectFeatures_open': openDetails}">
    <div class="projectFeatures_header">
      <ProjectHeader title="Features" buttonText="Add Feature" :toggleDialog="toggleDialog" />
    </div>
    <table class="projectFeatures_table" v-if="feats.length > 0">
      <thead>
        <tr>
          <th>
            Feature
            <span class="projectFeatures_filter">
              <i class="fas fa-long-arrow-alt-up projectFeatures_filter-icon" @click="setFilter('feature', 'asc')" />
              <i class="fas fa-long-arrow-alt-down projectFeatures_filter-icon" @click="setFilter('feature', 'dec')" />
            </span>
          </th>
          <th v-if="!openDetails">
            Created
            <span class="projectFeatures_filter">
              <i class="fas fa-long-arrow-alt-up projectFeatures_filter-icon" @click="setFilter('created', 'asc')" />
              <i class="fas fa-long-arrow-alt-down projectFeatures_filter-icon" @click="setFilter('created', 'dec')" />
            </span>
          </th>
          <th v-if="!openDetails">
            Last Updated
            <span class="projectFeatures_filter">
              <i class="fas fa-long-arrow-alt-up projectFeatures_filter-icon" @click="setFilter('updated', 'asc')" />
              <i class="fas fa-long-arrow-alt-down projectFeatures_filter-icon" @click="setFilter('updated', 'dec')" />
            </span>
          </th>
          <th>
            Priority
            <span class="projectFeatures_filter">
              <i class="fas fa-long-arrow-alt-up projectFeatures_filter-icon" @click="setFilter('priority', 'asc')" />
              <i class="fas fa-long-arrow-alt-down projectFeatures_filter-icon" @click="setFilter('priority', 'dec')" />
            </span>
          </th>
          <th>
            Status
            <span class="projectFeatures_filter">
              <i class="fas fa-long-arrow-alt-up projectFeatures_filter-icon" @click="setFilter('status', 'asc')" />
              <i class="fas fa-long-arrow-alt-down projectFeatures_filter-icon" @click="setFilter('status', 'dec')" />
            </span>
          </th>
          <th v-if="!openDetails">
            Assignee
            <span class="projectFeatures_filter">
              <i class="fas fa-long-arrow-alt-up projectFeatures_filter-icon" @click="setFilter('user', 'asc')" />
              <i class="fas fa-long-arrow-alt-down projectFeatures_filter-icon" @click="setFilter('user', 'dec')" />
            </span>
          </th>
        </tr>
      </thead>
      <tbody v-for="feature in feats" v-bind:key="feature.id">
        <tr class="projectFeatures_feature" :class="{'projectFeatures_selected': selected && feature.id === selected.id}" @click="clickFeature(feature)">
          <td>{{ feature.title }}</td>
          <td v-if="!openDetails">{{ feature.startDate | date }} {{ feature.startDate | time }}</td>
          <td v-if="!openDetails">{{ feature.updatedDate | date }} {{ feature.updatedDate | time }}</td>
          <td>
            <i class="fas fa-ban" :class="feature.priority" v-if="feature.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="feature.priority" v-if="feature.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="feature.priority" v-if="feature.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="feature.priority" v-if="feature.priority === 'minor'" />
            {{ feature.priority | capitalize }}
          </td>
          <td><i class="fas fa-circle" :class="feature.status" />{{ feature.status | capitalize }}</td>
          <td v-if="!openDetails">{{ feature.assignee | name }}</td>
        </tr>
      </tbody>
    </table>
    <div class="projectFeatures_empty" v-if="feats.length === 0 && !openDetails">
      <h4>No features to display</h4>
    </div>
    <div class="projectFeatures_details" v-if="openDetails">
      <FeatureDetails :feature="selected" :closeDetails="toggleDetails" />
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
    this.loadState();
  },
  data: () => ({
    id: String,
    // feature: {} as Feature,
    feats: [] as Feature[],
    filter: {
      data: 'Feature',
      sortDir: 'desc',
    },
    openDetails: false as boolean,
    proj: {} as Project,
    selected: {} as Feature,
    show: false  as boolean,
  }),
  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
    loadState(this: any) {
      const index: number = this.projects.findIndex((p: any) => p.id === this.id);
      const featIds = this.projects[index].features;
      this.feats = [];
      for (const id of featIds) {
        for (const f of this.features) {
          if (f.id === id) {
            this.feats.push(f);
          }
        }
      }
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    toggleDetails(this: any) {
      this.openDetails = !this.openDetails;
    },
    clickFeature(this: any, feature: Feature) {
      if (feature.id === this.selected.id) {
        this.toggleDetails();
      } else {
        this.openDetails = true;
      }

      if (this.openDetails === true) {
        this.selected = feature;
        this.feature = feature;
      }
    },
    setFilter(this: any, data: string, sortDir: string) {
      this.filter = {data, sortDir};
      // console.log(this.filter);
    },
  },
  watch: {
    features(this: any) {
      this.loadState();
    },
  },
};
</script>
