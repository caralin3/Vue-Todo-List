<template>
  <div class="projectList">
    <ul class="projectList_list" v-for="(proj, index) in projects" v-bind:key="index">
      <li class="projectItem">
        <div class="projectItem_overlay">
          <router-link class="projectItem_link" :to="{path: '/projects/' + proj.id, query: { filter: 'overview'}}">View Project</router-link>
        </div>
        <div class="projectItem_details">
          <div class="projectItem_header">
            <h3 class="projectItem_title">{{ proj.title }}</h3>
            <span class="projectItem_status"><strong>Status:</strong> {{ proj.status | capitalize }}</span>
          </div>
          <div class="projectItem_created">
            <span class="projectItem_by"><strong>Created by:</strong> {{ proj.creator | name }}</span>
            <span class="projectItem_date"><strong>Created:</strong> {{ new Date(proj.startDate) | date }}</span>
          </div>
          <p class="projectItem_description" v-if="proj.description !== ''">{{ proj.description }}</p>
          <p class="projectItem_description" v-else>No description</p>
          <div class="projectItem_update">
            <strong>Last Updated:</strong>
            {{ new Date(proj.updatedDate) | date }} {{ new Date(proj.updatedDate) | time }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import { Project } from '@/types';

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
  align-items: center;
  display: grid;
  gap: 3.5rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  justify-items: center;
  padding: 1rem 2rem 3rem 1rem;

  @media only screen and (max-width: 1200px) {
    padding: 1rem 5rem 3rem 2rem;
  }

  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    padding: 1rem 3rem 3rem 2rem;
  }

  @media only screen and (max-width: 660px) {
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
  max-width: 20rem;
  width: 100%;

  @media only screen and (max-width: 1064px) {
    height: 15rem;
  }

  @media only screen and (max-width: 800px) {
    max-width: 17rem;
  }

  @media only screen and (max-width: 660px) {
    margin: 1.5rem auto;
    height: 15rem;
    width: 20rem;
  }

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
  &_created {
    align-items: center;
    display: flex;
    justify-content: space-between;

    @media only screen and (max-width: 640px) {
      align-items: flex-start;
      flex-direction: column;
    }
  }

  &_title {
    margin: 0;
    
    @media only screen and (max-width: 640px) {
      align-self: center;
    }
  }

  &_status {
    line-height: 2;

    @media only screen and (max-width: 640px) {
      padding-top: 0.5rem;
    }
  }

  &_by,
  &_date, {
    font-size: 0.9rem;
    line-height: 2;
  }

  &_description {
    margin: 0;
    padding: 1rem 0;
    
    @media only screen and (max-width: 640px) {
      padding: 0.5rem 0;
    }
  }

  &_update {
    font-size: 0.9rem;
    line-height: 2;
    padding: 0.5rem 0 1rem 0;
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
