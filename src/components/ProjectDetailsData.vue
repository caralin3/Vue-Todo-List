<template>
  <div class="projectDetailsData">
    <h3 class="projectDetailsData_title">Details</h3>
    <div class="projectDetailsData_container">
      <div class="projectDetailsData_details">
        <span class="projectDetailsData_details-label">Creator:</span>
        <span>
          <i class="fas fa-user-circle projectDetailsData_details-userIcon" />
          <span>
            {{ proj.creator | name }}
          </span>
        </span>
      </div>
      <div class="projectDetailsData_details">
        <span class="projectDetailsData_details-label">Created:</span>
        <span class="projectDetailsData_details-text">
          {{ new Date(proj.startDate) | date }}
          {{ new Date(proj.startDate) | time }}
        </span>
      </div>
      <div class="projectDetailsData_details">
        <span class="projectDetailsData_details-label">Status:</span>
        <span class="projectDetailsData_details-edit" v-if="!edit.status" @click="toggleEdit('status')">
          <span v-if="status === 'Select Status'">
            <status-icon class="listItem_statusIcon" :status="proj.status" />
            {{ proj.status | capitalize }}
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
      <div class="projectDetailsData_details">
        <span class="projectDetailsData_details-label">Updated:</span>
        <span class="projectDetailsData_details-text">
          {{ new Date(proj.updatedDate) | date }}
          {{ new Date(proj.updatedDate) | time }}
        </span>
      </div>
      <div class="projectDetailsData_details">
        <span class="projectDetailsData_details-label">Version:</span>
        <span
          class="projectDetailsData_details-edit"
          contenteditable="true"
          @blur="handleChange($event.target.innerText)"
        >
          {{ proj.version }}
        </span>
      </div>
      <div class="projectDetailsData_details">
        <span class="projectDetailsData_details-label">Completed:</span>
        <span class="projectDetailsData_details-text" v-if="proj.endDate">
          {{ new Date(proj.endDate) | date }}
          {{ new Date(proj.endDate) | time }}
        </span>
        <span class="projectDetailsData_details-text" v-else>TBD</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import SelectInput from './SelectInput.vue';
import StatusIcon from './StatusIcon.vue';
import { Project, statusType } from '@/types';
import { statusOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'DetailsData',

  components: {
    SelectInput,
    StatusIcon,
  },

  props: {
    onChange: {
      type: Function,
    },
    proj: {
      type: Object,
    },
  },

  data: () => ({
    edit: {
      status: false,
    },
    status: 'Select Status' as statusType,
    statusOptions,
    update: {} as Project,
  }),

  created(this: any) {
    this.update = this.proj;
  },

  methods: {
    ...mapActions({
      editProject: 'projects/editProject',
    }),
    toggleEdit(this: any, type: string) {
      this.edit.status = !this.edit.status;
    },
    handleChange(this: any, value: string) {
      this.onChange('version', value);
    },
  },

  watch: {
    status(this: any) {
      this.edit.status = !this.edit.status;
      this.update = (this.status === 'completed' ||
      this.status === 'closed') ?
      {
        ...this.update,
        endDate: new Date().toString(),
        startDate: new Date(this.update.startDate).toString(),
        status: this.status,
        updatedDate: new Date().toString(),
      }
      : {
        ...this.update,
        endDate: '',
        startDate: new Date(this.update.startDate).toString(),
        status: this.status,
        updatedDate: new Date().toString(),
      };
      this.editProject(this.update);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.projectDetailsData {
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
