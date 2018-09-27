<template>
  <div class="detailsData">
    <h3 class="detailsData_title">Details</h3>
    <div class="detailsData_container">
      <div class="detailsData_details">
        <span class="detailsData_details-label">Assignee:</span>
        <span class="detailsData_details-edit" v-if="!edit.assignee" @click="toggleEdit('assignee')">
          <i class="fas fa-user-circle detailsData_details-userIcon" />
          <span v-if="item.assignee.firstName !== 'Select'">
            {{ item.assignee | name }}
          </span>
          <span v-else>
            {{ assignee | name }}
          </span>
        </span>
        <select-user-input
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
          <i class="fas fa-user-circle detailsData_details-userIcon" />
          <span v-if="item.reporter">
            <span v-if="item.reporter.firstName === 'Select' && reporter.firstName === 'Select'"> None</span>
            <span v-else-if="item.reporter.firstName !== 'Select' && reporter.firstName === 'Select'">
              {{ item.reporter | name }}
            </span>
            <span v-else>
              {{ reporter | name }}
            </span>
          </span>
        </span>
        <select-user-input
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
            <priority-icon class="listItem_priorityIcon" :priority="item.priority"/>
            {{ item.priority | capitalize }}
          </span>
          <span v-else>
            <priority-icon class="listItem_priorityIcon" :priority="priority"/>
            {{ priority | capitalize }}
          </span>
        </span>
        <select-input
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
            <status-icon class="listItem_statusIcon" :status="status" />
            {{ status | capitalize }}
          </span>
        </span>
        <select-input
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
import SelectInput from './SelectInput.vue';
import SelectUserInput from './SelectUserInput.vue';
import StatusIcon from './StatusIcon.vue';
import { Feature, Item, priorityType, statusType, User } from '@/types';
import { priorityOptions, statusOptions, userOptions } from '@/utils/constants';

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
    filter: '',
    reporter: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    reporterId: '',
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    status: 'Select Status' as statusType,
    statusOptions,
    update: {} as Feature | Item,
    userOptions,
  }),

  created(this: any) {
    this.filter = this.$route.query.filter;
    this.update = this.item;
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
    doEdit(this: any, item: Feature | Item) {
      if (this.filter === 'features') {
        this.editFeature(item);
      } else {
        this.editItem(item);
      }
    },
  },

  watch: {
    assigneeId(this: any) {
      this.edit.assignee = !this.edit.assignee;
      this.assignee = this.userOptions.filter((user: User) => user.id === this.assigneeId)[0];
      this.update = {
        ...this.update,
        assignee: this.assignee,
        startDate: new Date(this.update.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.doEdit(this.update);
    },
    priority(this: any) {
      this.edit.priority = !this.edit.priority;
      this.update = {
        ...this.update,
        priority: this.priority,
        startDate: new Date(this.update.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.doEdit(this.update);
    },
    reporterId(this: any) {
      this.edit.reporter = !this.edit.reporter;
      this.reporter = this.userOptions.filter((user: User) => user.id === this.reporterId)[0];
      this.update = {
        ...this.update,
        reporter: this.reporter,
        startDate: new Date(this.update.startDate).toString(),
        updatedDate: new Date().toString(),
      };
      this.doEdit(this.update);
    },
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.update = {
        ...this.update,
        startDate: new Date(this.update.startDate).toString(),
        status: this.status,
        updatedDate: new Date().toString(),
      };
      this.doEdit(this.update);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.detailsData {
  padding: 1rem;

  &_title {
    border-bottom: 1px solid @madison;
    padding-bottom: 0.5rem;
  }

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
