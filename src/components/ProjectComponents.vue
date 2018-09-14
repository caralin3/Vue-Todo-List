<template>
  <div class="projectComps" :class="{'projectComps_open': openDetails}">
    <div class="projectComps_header" :class="{'projectComps_open-header': openDetails}">
      <ProjectHeader title="Components" buttonText="Add Component" :toggleDialog="toggleDialog" />
    </div>
    <AddItemDialog v-if="show" :toggleDialog="toggleDialog" />
    <div class="projectComps_table" :class="{'projectComps_open-table': openDetails}" v-if="comps.length > 0">
      <table>
        <thead>
          <tr>
            <th>
              Components
              <span class="projectComps_filter">
                <i class="fas fa-long-arrow-alt-up projectComps_filter-icon" @click="setFilter('item', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectComps_filter-icon" @click="setFilter('item', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Created
              <span class="projectComps_filter">
                <i class="fas fa-long-arrow-alt-up projectComps_filter-icon" @click="setFilter('created', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectComps_filter-icon" @click="setFilter('created', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Last Updated
              <span class="projectComps_filter">
                <i class="fas fa-long-arrow-alt-up projectComps_filter-icon" @click="setFilter('updated', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectComps_filter-icon" @click="setFilter('updated', 'dec')" />
              </span>
            </th>
            <th>
              Priority
              <span class="projectComps_filter">
                <i class="fas fa-long-arrow-alt-up projectComps_filter-icon" @click="setFilter('priority', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectComps_filter-icon" @click="setFilter('priority', 'dec')" />
              </span>
            </th>
            <th>
              Status
              <span class="projectComps_filter">
                <i class="fas fa-long-arrow-alt-up projectComps_filter-icon" @click="setFilter('status', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectComps_filter-icon" @click="setFilter('status', 'dec')" />
              </span>
            </th>
            <th v-if="!openDetails">
              Assignee
              <span class="projectComps_filter">
                <i class="fas fa-long-arrow-alt-up projectComps_filter-icon" @click="setFilter('user', 'asc')" />
                <i class="fas fa-long-arrow-alt-down projectComps_filter-icon" @click="setFilter('user', 'dec')" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody v-for="comp in comps" v-bind:key="comp.id">
          <tr class="projectComps_comp" :class="{'projectComps_selected': selected && comp.id === selected.id}" @click="clickComp(comp)">
            <td>{{ comp.title }}</td>
            <td v-if="!openDetails">{{ comp.startDate | date }} {{ comp.startDate | time }}</td>
            <td v-if="!openDetails">{{ comp.updatedDate | date }} {{ comp.updatedDate | time }}</td>
            <td>
              <i class="fas fa-ban" :class="comp.priority" v-if="comp.priority === 'blocker'" />
              <i class="fas fa-exclamation-triangle" :class="comp.priority" v-if="comp.priority === 'critical'" />
              <i class="fas fa-arrow-up" :class="comp.priority" v-if="comp.priority === 'major'" />
              <i class="fas fa-arrow-down" :class="comp.priority" v-if="comp.priority === 'minor'" />
              {{ comp.priority | capitalize }}
            </td>
            <td><i class="fas fa-circle" :class="comp.status" />{{ comp.status | capitalize }}</td>
            <td v-if="!openDetails">{{ comp.assignee | name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="projectComps_empty" v-if="comps.length === 0 && !openDetails">
      <h4>No components to display</h4>
    </div>
    <div class="projectComps_details" v-if="openDetails">
      <ComponentDetails :comp="selected" :closeDetails="toggleDetails" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import AddItemDialog from '@/components/AddItemDialog.vue';
import ComponentDetails from '@/components/ComponentDetails.vue';
import ProjectHeader from '@/components/ProjectHeader.vue';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
    AddItemDialog,
    ComponentDetails,
    ProjectHeader,
  },
  created(this: any) {
    this.id = this.$route.params.id;
    this.loadState();
  },
  data: () => ({
    id: String,
    comps: [] as Item[],
    filter: {
      data: 'Comp',
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
      const compIds: string[] = [];
      this.comps = [];
      const feats: Feature[] = [];
      for (const fid of featIds) {
        for (const f of this.features) {
          if (f.id === fid) {
            feats.push(f);
          }
        }
      }

      for (const cid of featIds) {
        for (const c of this.items) {
          if (c.id === cid && c.type === 'component') {
            this.comps.push(c);
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
    clickComp(this: any, comp: Item) {
      if (comp.id === this.selected.id) {
        this.toggleDetails();
      } else {
        this.openDetails = true;
      }

      if (this.openDetails === true) {
        this.selected = comp;
        // this.comp = comp;
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
