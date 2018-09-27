<template>
  <div class="projectList">
    <ul class="projectList_list" v-for="(proj, index) in projects" v-bind:key="index">
      <li class="projectItem">
        <div class="projectItem_overlay">
          <router-link class="projectItem_link" :to="{path: '/projects/' + proj.id, query: { filter: 'activity'}}">View Project</router-link>
        </div>
        <div class="projectItem_details">
          <div class="projectItem_header">
            <h3 class="projectItem_title">{{ proj.title }}</h3>
            <span class="projectItem_status">Status: {{ proj.status | capitalize }}</span>
          </div>
          <div class="projectItem_created">
            <span class="projectItem_by">Created by: {{ proj.creator | name }}</span>
            <span class="projectItem_date">Created on: {{ new Date(proj.startDate) | date }}</span>
          </div>
          <p class="projectItem_description" v-if="proj.description !== ''">{{ proj.description }}</p>
          <p class="projectItem_description" v-else>No description</p>
          <div class="projectItem_latest" v-if="proj.features.length > 0">
            <h5 class="projectItem_latestTitle">Latest Update</h5>
            <div class="projectItem_featureDetails">
              <div class="projectItem_featureTitle">{{ proj.features[0].title }}</div>
              <div class="projectItem_featureDate">Last Updated: {{ new Date(proj.features[0].updatedDate) | date }}</div>
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

export default Vue.extend({
  name: 'ProjectList',

  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
    ...mapGetters('projects', [
      'projectCount',
    ]),
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.projectList {
  display: grid;
  gap: 3.5rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  justify-items: center;
  padding: 1rem 2rem 3rem;

  @media only screen and (max-width: 640px) {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.projectItem {
  background-color: @medium-sea-green;
  color: @madison;
  padding: 1.5rem;
  height: 12rem;
  width: 20rem;

  &_overlay {
    left: 50%;
    opacity: 0;
    position: relative;
    top: 6rem;
    text-align: center;
    transition: .5s ease;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    z-index: 1;
  }

  &_link {
    background-color: @white;
    color: @medium-sea-green;
    padding: 1rem 2rem;
  }

  &_header,
  &_created,
  &_featureDetails {
    align-items: center;
    display: flex;
    justify-content: space-between;
  }

  &_title {
    margin: 0;
  }

  &_by,
  &_date {
    font-size: 0.8rem;
    line-height: 2;
  }

  &_description {
    margin: 0;
    padding: 0.5rem 0;
    width: 100%;
  }

  &_latest {
    padding: 0.5rem 0 1rem 0;
  }

  &_latestTitle {
    margin: 0;
  }

  &_featureTitle,
  &_featureDate {
    font-size: 0.9rem;
    line-height: 2;
  }

  @media only screen and (max-width: 640px) {
    margin: 1.5rem auto;
    padding: 1rem;
    height: 12rem;
    width: 90%;
  }
}

.projectItem:hover {
  .projectItem_details {
    opacity: 0.3;
  }

  .projectItem_overlay {
    opacity: 1;
  }
}
</style>
