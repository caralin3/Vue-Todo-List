<template>
  <div class="projectComponents">
    <div class="projectComponents_header">
      <ProjectHeader title="Components" buttonText="Add Component" :toggleDialog="toggleDialog" />
    </div>
    <ul class="projectComponents_list" v-if="components.length > 0 && !openDetails">
      <li class="projectComponent" v-for="component in components" v-bind:key="component.id">
        <div class="projectComponent_overlay" @click="clickFeature(component)">
          <!-- <router-link class="projectComponent_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'features', id: component.id}}"> -->
          <router-link class="projectComponent_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'components'}}">
            View Component
          </router-link>
        </div>
        <div class="projectComponent_details">
          <h3 class="projectComponent_title">{{ component.title }}</h3>
          <span class="projectComponent_date">{{ component.updatedDate | date }} {{ component.updatedDate | time }}</span>
          <span class="projectComponent_priority">Priority: {{ component.priority | capitalize }}</span>
          <span class="projectComponents_status">Status: {{ component.status | capitalize }}</span>
        </div>
      </li>
    </ul>
    <div class="projectComponents_empty" v-if="components.length === 0 && !openDetails">
      <h4>No components to display</h4>
    </div>
    <div class="projectComponents_details" v-if="openDetails">
      <ComponentDetails :component="component" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import ComponentDetails from '@/components/ComponentDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    ComponentDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    const features: Feature[] = this.projects[index].features;
    for (let feature of features) {
      const items: Item[] = feature.items;
      for (let item of items) {
        if (item.type === 'component') {
          this.tasks.push(item);
        }
      }
    }
  },
  data: () => ({
    components: [],
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
    clickFeature(this: any, component: Item) {
      console.log(component);
      this.toggleDetails();
      // if (!this.openDetails) {
      //   this.$router.go(-1);
      // }
    },
  },
};
</script>
