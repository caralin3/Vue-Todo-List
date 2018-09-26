<template>
  <div class="detailsData">
    <h3 class="detailsData_title">Details</h3>
    <div class="detailsData_container">
      <div class="detailsData_details">
        <span class="detailsData_details-label">Assignee:</span>
        <span class="detailsData_details-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <span v-if="item.assignee.firstName !== 'Select'">
            <i class="fas fa-user-circle detailsData_details-userIcon" />
            {{ item.assignee | name }}
          </span>
          <span v-else>
            <i class="fas fa-user-circle detailsData_details-userIcon" />
            {{ assignee | name }}
          </span>
        </span>
        <SelectUserInput
          class="detailsData_details-select"
          v-if="edit.assignee"
          v-model="assigneeId"
          :onBlur="() => this.edit.assignee = false"
          :onFocus="() => this.edit.assignee = true"
          :options="userOptions"
        />
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Created:</span>
        <span class="detailsData_details-text">
          {{ new Date(item.startDate) | date }}
          {{ new Date(item.startDate) | time }}
        </span>
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Reporter:</span>
        <span class="detailsData_details-edit" v-if="!edit.reporter" @click="toggleEdit('reporter')">
          <span v-if="!item.reporter"> None</span>
          <span v-if="item.reporter && reporter">
            <span v-if="item.reporter.firstName !== 'Select'">
              <i class="fas fa-user-circle detailsData_details-userIcon" />
              {{ item.reporter | name }}
            </span>
            <span v-else>
              <i class="fas fa-user-circle detailsData_details-userIcon" />
              {{ reporter | name }}
            </span>
          </span>
        </span>
        <SelectUserInput
          class="detailsData_details-select"
          v-if="edit.reporter"
          v-model="reporterId"
          :onBlur="() => this.edit.reporter = false"
          :onFocus="() => this.edit.reporter = true"
          :options="userOptions"
        />
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Updated:</span>
        <span class="detailsData_details-text">
          {{ new Date(item.updatedDate) | date }}
          {{ new Date(item.updatedDate) | time }}
        </span>
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Priority:</span>
        <span class="detailsData_details-edit" v-if="!edit.priority" @click="toggleEdit('priority')">
           <span v-if="priority === 'Select Priority'">
            <i class="fas fa-ban" :class="item.priority" v-if="item.priority === 'blocker'" />
            <i class="fas fa-exclamation-triangle" :class="item.priority" v-if="item.priority === 'critical'" />
            <i class="fas fa-arrow-up" :class="item.priority" v-if="item.priority === 'major'" />
            <i class="fas fa-arrow-down" :class="item.priority" v-if="item.priority === 'minor'" />
            {{ item.priority | capitalize }}
          </span>
          <span v-else>
            <priority-icon class="listItem_priorityIcon" :priority="item.priority"/>
            {{ priority | capitalize }}
          </span>
        </span>
        <SelectInput
          :class="'detailsData_details-select'"
          v-if="edit.priority"
          v-model="priority"
          :onBlur="() => this.edit.priority = false"
          :onFocus="() => this.edit.priority = true"
          :options="priorityOptions"
        />
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Completed:</span>
        <span class="detailsData_details-text" v-if="item.endDate">
          {{ new Date(item.endDate) | date }}
          {{ new Date(item.endDate) | time }}
        </span>
        <span class="detailsData_details-text" v-else>TBD</span>
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Status:</span>
        <span class="detailsData_details-edit" v-if="!edit.status" @click="toggleEdit('status')">
          <span v-if="status === 'Select Status'">
            <status-icon class="listItem_statusIcon" :status="item.status" />
            {{ item.status | capitalize }}
          </span>
          <span v-else>
            <status-icon class="listItem_statusIcon" :status="item.status" />
            {{ status | capitalize }}
          </span>
        </span>
        <SelectInput
          :class="'details_select'"
          v-if="edit.status"
          v-model="status"
          :onBlur="() => this.edit.status = false"
          :onFocus="() => this.edit.status = true"
          :options="statusOptions"
        />
      </div>
      <div class="detailsData_details">
        <span class="detailsData_details-label">Version:</span>
        <span>
          {{ item.version.title }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import PriorityIcon from './PriorityIcon.vue';
import StatusIcon from './StatusIcon.vue';
import SelectInput from './SelectInput.vue';
import SelectUserInput from './SelectUserInput.vue';
import { Feature, priorityType, statusType, User } from '@/types';
import { priorityOptions, statusOptions, getUserOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'DetailsData',

  components: {
    PriorityIcon,
    SelectInput,
    SelectUserInput,
    StatusIcon,
  },

  props: {
    item: {
      type: Object,
    },
  },

  data: () => ({
    assignee: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    assigneeId: '',
    edit: {
      assignee: false,
      priority: false,
      reporter: false,
      status: false,
    },
    projId: String,
    reporter: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    reporterId: '',
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    show: false,
    showItemDialog: false,
    status: 'Select Status' as statusType,
    statusOptions,
    userOptions: [] as string[],
  }),

  created(this: any) {
    this.userOptions = getUserOptions();
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
      items: (state: any) => state.items.items,
    }),
  },

  methods: {
    ...mapActions({
      editFeature: 'features/editFeature',
      editItem: 'items/editItem',
    }),
    initalizeFeatureArrays(ids: string[], stateArray: any[], featureArray: any[]) {
      for (const id of ids) {
        for (const v of stateArray) {
          if (v.id === id) {
            featureArray.push(v);
          }
        }
      }
    },
    loadFeatureState(this: any) {
      const index: number = this.features.findIndex((f: Feature) => f.id === this.feature.id);
      this.updatedFeature = this.features[index];
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    toggleEdit(this: any, type: string) {
      if (type === 'assignee') {
        this.edit.assignee = !this.edit.assignee;
      } else if (type === 'priority') {
        this.edit.priority = !this.edit.priority;
      } else if (type === 'reporter') {
        this.edit.reporter = !this.edit.reporter;
      } else if (type === 'status') {
        this.edit.status = !this.edit.status;
      }
    },
  },

  watch: {
    assigneeId(this: any) {
      this.edit.assignee = !this.edit.assignee;
      for (const user of this.userOptions) {
        if (user.id === this.assigneeId) {
          this.assignee = user;
        }
      }
      this.updatedFeature = {
        ...this.updatedFeature,
        assignee: this.assignee,
        startDate: new Date(this.updatedFeature.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editFeature(this.updatedFeature);
    },
    feature(this: any) {
      this.loadFeatureState();
    },
    priority(this: any) {
      this.edit.priority = !this.edit.priority;
      this.updatedFeature = {
        ...this.updatedFeature,
        priority: this.priority,
        startDate: new Date(this.updatedFeature.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editFeature(this.updatedFeature);
    },
    reporterId(this: any) {
      this.edit.reporter = !this.edit.reporter;
      for (const user of this.userOptions) {
        if (user.id === this.reporterId) {
          this.reporter = user;
        }
      }
      this.updatedFeature = {
        ...this.updatedFeature,
        reporter: this.reporter,
        startDate: new Date(this.updatedFeature.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.editFeature(this.updatedFeature);
    },
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.updatedFeature = {
        ...this.updatedFeature,
        startDate: new Date(this.updatedFeature.startDate).toString(),
        status: this.status,
        updatedDate: new Date().toString(),
      };
      this.editFeature(this.updatedFeature);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.detailsData {
  // @media only screen and (max-width: 640px) {
  //   margin: 0 auto;
  //   width: 100%;
  // }

  &_container {
    display: grid;
    grid-column-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);

    @media only screen and (max-width: 640px) {
      align-items: flex-start;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  &_details {
    align-items: center;
    display: grid;
    grid-template-columns: 6rem 1fr;

    &-label {
      font-weight: bold;
    }

    &-edit {
      padding: 0.3rem 0.5rem;

      &:hover {
        border: 1px solid @madison;
        cursor: pointer;
      }
    }

    &-text {
      padding: 0.3rem 0.5rem;
    }
  }
}
</style>
