<template>
  <div class="projectTasks" :class="{'projectTasks_open': openDetails}">
    <div class="projectTasks_header" :class="{'projectTasks_open-header': openDetails}">
      <ProjectHeader title="Tasks" buttonText="Add Task" :toggleDialog="toggleDialog" />
    </div>
    <AddItemDialog v-if="show" :toggleDialog="toggleDialog" />
    <div class="projectTasks_table" :class="{'projectTasks_open-table': openDetails}" v-if="tasks.length > 0">
      <table class="projectTasks_table" :class="{'projectTasks_open-table': openDetails}" v-if="tasks.length > 0">
        <thead>
          <tr>
            <th>
              Task
              <span class="projectTasks_filter">
                <i class="fas fa-long-arrow-alt-up projectTasks_filter-icon" @click="setFilter('item', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectTasks_filter-icon" @click="setFilter('item', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Created
              <span class="projectTasks_filter">
                <i class="fas fa-long-arrow-alt-up projectTasks_filter-icon" @click="setFilter('created', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectTasks_filter-icon" @click="setFilter('created', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Last Updated
              <span class="projectTasks_filter">
                <i class="fas fa-long-arrow-alt-up projectTasks_filter-icon" @click="setFilter('updated', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectTasks_filter-icon" @click="setFilter('updated', 'dec')" />
              </span>
            </th>
            <th>
              Priority
              <span class="projectTasks_filter">
                <i class="fas fa-long-arrow-alt-up projectTasks_filter-icon" @click="setFilter('priority', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectTasks_filter-icon" @click="setFilter('priority', 'dec')" />
              </span>
            </th>
            <th>
              Status
              <span class="projectTasks_filter">
                <i class="fas fa-long-arrow-alt-up projectTasks_filter-icon" @click="setFilter('status', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectTasks_filter-icon" @click="setFilter('status', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Assignee
              <span class="projectTasks_filter">
                <i class="fas fa-long-arrow-alt-up projectTasks_filter-icon" @click="setFilter('user', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectTasks_filter-icon" @click="setFilter('user', 'dec')" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody v-for="task in tasks" v-bind:key="task.id">
          <tr class="projectTasks_task" :class="{'projectTasks_selected': selected && task.id === selected.id}" @click="clickTask(task)">
            <td>{{ task.title }}</td>
            <td v-if="!openDetails">{{ task.startDate | date }} {{ task.startDate | time }}</td>
            <td v-if="!openDetails">{{ task.updatedDate | date }} {{ task.updatedDate | time }}</td>
            <td>
              <i class="fas fa-ban" :class="task.priority" v-if="task.priority === 'blocker'" />
              <i class="fas fa-exclamation-triangle" :class="task.priority" v-if="task.priority === 'critical'" />
              <i class="fas fa-arrow-up" :class="task.priority" v-if="task.priority === 'major'" />
              <i class="fas fa-arrow-down" :class="task.priority" v-if="task.priority === 'minor'" />
              {{ task.priority | capitalize }}
            </td>
            <td><i class="fas fa-circle" :class="task.status" />{{ task.status | capitalize }}</td>
            <td v-if="!openDetails">{{ task.assignee | name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="projectTasks_empty" v-if="tasks.length === 0 && !openDetails">
      <h4>No tasks to display</h4>
    </div>
    <div class="projectTasks_details" v-if="openDetails">
      <TaskDetails :task="selected" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import AddItemDialog from '@/components/AddItemDialog.vue';
import TaskDetails from '@/components/TaskDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    AddItemDialog,
    TaskDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    this.loadState();
  },
  data: () => ({
    id: String,
    tasks: [] as Item[],
    filter: {
      data: 'Task',
      sortDir: 'desc',
    },
    openDetails: false as boolean,
    proj: {} as Project,
    selected: {} as Item,
    show: false  as boolean,
  }),
  computed: {
    ...mapState({
      items: (state: any) => state.items.items,
      features: (state: any) => state.features.features,
      projects: (state: any) => state.projects.projects,
    }),
  },
  methods: {
    loadState(this: any) {
      const index: number = this.projects.findIndex((p: any) => p.id === this.id);
      const featIds = this.projects[index].features;
      const taskIds: string[] = [];
      this.tasks = [];
      const feats: Feature[] = [];
      for (const fid of featIds) {
        for (const f of this.features) {
          if (f.id === fid) {
            feats.push(f);
          }
        }
      }

      for (const tid of featIds) {
        for (const t of this.items) {
          if (t.id === tid && t.type === 'task') {
            this.tasks.push(t);
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
    clickTask(this: any, task: Item) {
      if (task.id === this.selected.id) {
        this.toggleDetails();
      } else {
        this.openDetails = true;
      }

      if (this.openDetails === true) {
        this.selected = task;
        // this.task = task;
      }
    },
    setFilter(this: any, data: string, sortDir: string) {
      this.filter = {data, sortDir};
      // console.log(this.filter);
    },
  },
  watch: {
    items(this: any) {
      this.loadState();
    },
  },
};
</script>
