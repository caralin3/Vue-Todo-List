<template>
  <div class="projectTasks">
    <div class="projectTasks_header">
      <ProjectHeader title="Tasks" buttonText="Add Task" :toggleDialog="toggleDialog" />
    </div>
    <ul class="projectTasks_list" v-if="tasks.length > 0 && !openDetails">
      <li class="projectTask" v-for="task in tasks" v-bind:key="task.id">
        <div class="projectTask_overlay" @click="clickFeature(task)">
          <!-- <router-link class="projectTask_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'features', id: task.id}}"> -->
          <router-link class="projectTask_link" :id="id" :to="{ path: '/projects/' + id, query: { filter: 'tasks'}}">
            View Task
          </router-link>
        </div>
        <div class="projectTask_details">
          <h3 class="projectTask_title">{{ task.title }}</h3>
          <span class="projectTask_date">{{ task.updatedDate | date }} {{ task.updatedDate | time }}</span>
          <span class="projectTask_priority">Priority: {{ task.priority | capitalize }}</span>
          <span class="projectTasks_status">Status: {{ task.status | capitalize }}</span>
        </div>
      </li>
    </ul>
    <div class="projectTasks_empty" v-if="tasks.length === 0 && !openDetails">
      <h4>No tasks to display</h4>
    </div>
    <div class="projectTasks_details" v-if="openDetails">
      <TaskDetails :task="task" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import TaskDetails from '@/components/TaskDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    TaskDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    const index: number = this.projects.findIndex((p: any) => p.id === this.id);
    const features: Feature[] = this.projects[index].features;
    for (let feature of features) {
      const items: Item[] = feature.items;
      for (let item of items) {
        if (item.type === 'task') {
          this.tasks.push(item);
        }
      }
    }
  },
  data: () => ({
    tasks: [],
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
    clickFeature(this: any, task: Item) {
      console.log(task);
      this.toggleDetails();
      // if (!this.openDetails) {
      //   this.$router.go(-1);
      // }
    },
  },
};
</script>
