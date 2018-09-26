<template>
  <div class="project">
    <Sidebar />
    <div class="project_container" v-if="filter === 'activity'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'board'">
      <ProjectBoard />
    </div>
    <div class="project_container" v-if="filter === 'features'">
      <!-- <ProjectFeatures /> -->
      <!-- <item-list icon="feature" :items="features" /> -->
      <!-- <item-details /> -->
      <!-- <details-header :title="features[0].title" :onClose="() => console.log('clicked')" /> -->
      <!-- <details-data :item="features[0]" /> -->
      <!-- <description text="Lorem ipsum" /> -->
      <links :links="links" />
    </div>
    <div class="project_container" v-if="filter === 'items'">
      <ProjectTasks />
    </div>
    <div class="project_container" v-if="filter === 'tasks'">
      <ProjectTasks />
    </div>
    <div class="project_container" v-if="filter === 'components'">
      <ProjectComponents />
    </div>
    <div class="project_container" v-if="filter === 'bugs'">
      <ProjectBugs />
    </div>
    <div class="project_container" v-if="filter === 'members'">
      <ProjectBugs />
    </div>
    <div class="project_container" v-if="!filter">
      <ProjectDetails />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import Links from '@/components/Links.vue';
import ItemDetails from '@/components/ItemDetails.vue';
import Description from '@/components/Description.vue';
import DetailsData from '@/components/DetailsData.vue';
import DetailsHeader from '@/components/DetailsHeader.vue';
import ItemList from '@/components/ItemList.vue';
import ProjectBoard from '@/components/ProjectBoard.vue';
import ProjectBugs from '@/components/ProjectBugs.vue';
import ProjectComponents from '@/components/ProjectComponents.vue';
import ProjectDetails from '@/components/ProjectDetails.vue';
import ProjectFeatures from '@/components/ProjectFeatures.vue';
import ProjectTasks from '@/components/ProjectTasks.vue';
import Sidebar from '@/components/Sidebar.vue';
import { Feature, Link } from '@/types';
import { Feature1, Feature2, Feature3, Feature4, Link1, Link2 } from '@/store/state';

@Component({
  components: {
    Links,
    Description,
    DetailsData,
    DetailsHeader,
    ItemDetails,
    ItemList,
    ProjectBoard,
    ProjectBugs,
    ProjectComponents,
    ProjectDetails,
    ProjectFeatures,
    ProjectTasks,
    Sidebar,
  },
  created(this: any) {
    this.getFilter();
  },
  data: () => ({
    filter: String,
    features: [Feature1, Feature2, Feature3, Feature4] as Feature[],
    links: [Link1, Link2] as Link[],
  }),
  methods: {
    getFilter(this: any) {
      this.filter = this.$route.query.filter;
    },
  },
  watch: {
    '$route.query.filter'(this: any) {
      this.getFilter();
    },
  },
})
export default class Project extends Vue {}
</script>
