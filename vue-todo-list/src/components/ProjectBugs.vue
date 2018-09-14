<template>
  <div class="projectBugs" :class="{'projectBugs_open': openDetails}">
    <div class="projectBugs_header" :class="{'projectBugs_open-header': openDetails}">
      <ProjectHeader title="Bugs" buttonText="Add Bug" :toggleDialog="toggleDialog" />
    </div>
    <AddItemDialog v-if="show" :toggleDialog="toggleDialog" />
    <div class="projectBugs_table" v-if="bugs.length > 0" :class="{'projectBugs_open-table': openDetails}">
      <table class="projectBugs_table" v-if="bugs.length > 0">
        <thead>
          <tr>
            <th>
              Bug
              <span class="projectBugs_filter">
                <i class="fas fa-long-arrow-alt-up projectBugs_filter-icon" @click="setFilter('item', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectBugs_filter-icon" @click="setFilter('item', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Created
              <span class="projectBugs_filter">
                <i class="fas fa-long-arrow-alt-up projectBugs_filter-icon" @click="setFilter('created', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectBugs_filter-icon" @click="setFilter('created', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Last Updated
              <span class="projectBugs_filter">
                <i class="fas fa-long-arrow-alt-up projectBugs_filter-icon" @click="setFilter('updated', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectBugs_filter-icon" @click="setFilter('updated', 'dec')" />
              </span>
            </th>
            <th>
              Priority
              <span class="projectBugs_filter">
                <i class="fas fa-long-arrow-alt-up projectBugs_filter-icon" @click="setFilter('priority', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectBugs_filter-icon" @click="setFilter('priority', 'dec')" />
              </span>
            </th>
            <th>
              Status
              <span class="projectBugs_filter">
                <i class="fas fa-long-arrow-alt-up projectBugs_filter-icon" @click="setFilter('status', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectBugs_filter-icon" @click="setFilter('status', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Assignee
              <span class="projectBugs_filter">
                <i class="fas fa-long-arrow-alt-up projectBugs_filter-icon" @click="setFilter('user', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectBugs_filter-icon" @click="setFilter('user', 'dec')" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody v-for="bug in bugs" v-bind:key="bug.id">
          <tr class="projectBugs_bug" :class="{'projectBugs_selected': selected && bug.id === selected.id}" @click="clickBug(bug)">
            <td>{{ bug.title }}</td>
            <td v-if="!openDetails">{{ bug.startDate | date }} {{ bug.startDate | time }}</td>
            <td v-if="!openDetails">{{ bug.updatedDate | date }} {{ bug.updatedDate | time }}</td>
            <td>
              <i class="fas fa-ban" :class="bug.priority" v-if="bug.priority === 'blocker'" />
              <i class="fas fa-exclamation-triangle" :class="bug.priority" v-if="bug.priority === 'critical'" />
              <i class="fas fa-arrow-up" :class="bug.priority" v-if="bug.priority === 'major'" />
              <i class="fas fa-arrow-down" :class="bug.priority" v-if="bug.priority === 'minor'" />
              {{ bug.priority | capitalize }}
            </td>
            <td><i class="fas fa-circle" :class="bug.status" />{{ bug.status | capitalize }}</td>
            <td v-if="!openDetails">{{ bug.assignee | name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="projectBugs_empty" v-if="bugs.length === 0 && !openDetails">
      <h4>No bugs to display</h4>
    </div>
    <div class="projectBugs_details" v-if="openDetails">
      <BugDetails :bug="selected" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import AddItemDialog from '@/components/AddItemDialog.vue';
import BugDetails from '@/components/BugDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    AddItemDialog,
    BugDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    this.loadState();
  },
  data: () => ({
    id: String,
    bugs: [] as Item[],
    filter: {
      data: 'Bug',
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
      const bugIds: string[] = [];
      this.bugs = [];
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
          if (t.id === tid && t.type === 'bug') {
            this.bugs.push(t);
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
    clickBug(this: any, bug: Item) {
      if (bug.id === this.selected.id) {
        this.toggleDetails();
      } else {
        this.openDetails = true;
      }

      if (this.openDetails === true) {
        this.selected = bug;
        // this.bug = bug;
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
