<template>
  <div class="filterDialog">
    <Dialog title="Filter" :toggle-dialog="dismissDialog">
      <Form buttonText="Set Filters" :toggle-dialog="submitDialog" :submit="onSubmitForm">
        <div class="filterDialog_content">
          <alert v-if="showAlert" :text="`Missing required field: ${errorMessage}`" />
          <div class="filterDialog_option">
            <div :class="{'filterDialog_check': !priorityFilter}">
              <input class="filterDialog__check-input" id="priority" type="checkbox" v-model="checked" value="priority" />
              <label class="filterDialog_check-label" for="priority">Priority</label>
            </div>
            <select-input
              :class="'filterDialog_select'"
              v-if="priorityFilter"
              v-model="priority"
              :options="priorityOptions"
              :onBlur="() => null"
              :onFocus="() => null"
            />
          </div>
          <div class="filterDialog_option">
            <div :class="{'filterDialog_check': !statusFilter}">
              <input class="filterDialog__check-input" id="status" type="checkbox" v-model="checked" value="status" />
              <label class="filterDialog_check-label" for="status">Status</label>
            </div>
            <select-input
              :class="'filterDialog_select'"
              v-if="statusFilter"
              v-model="status"
              :options="statusOptions"
              :onBlur="() => null"
              :onFocus="() => null"
            />
          </div>
          <div class="filterDialog_option" v-if="$route.query.filter === 'items'">
            <div :class="{'filterDialog_check': !itemTypeFilter}">
              <input class="filterDialog__check-input" id="itemType" type="checkbox" v-model="checked" value="type" />
              <label class="filterDialog_check-label" for="itemType">Item Type</label>
            </div>
            <select-input
              :class="'filterDialog_select'"
              v-if="itemTypeFilter"
              v-model="itemType"
              :options="itemTypeOptions" 
              :onBlur="() => null"
              :onFocus="() => null"
            />
          </div>
          <div class="filterDialog_option">
            <div :class="{'filterDialog_check': !assigneeFilter}">
              <input class="filterDialog__check-input" id="assignee" type="checkbox" v-model="checked" value="assignee" />
              <label class="filterDialog_check-label" for="assignee">Assignee</label>
            </div>
            <select-user-input
              :class="'filterDialog_select'"
              v-if="assigneeFilter"
              v-model="assigneeId"
              :options="userOptions"
              :onBlur="() => null"
              :onFocus="() => null"
            />
          </div>
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Alert from '@/components/Alert.vue';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import { Feature, Item, itemType, priorityType, statusType, User } from '@/types';
import { itemTypeOptions, priorityOptions, statusOptions, userOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'FilterDialog',

  components: {
    Alert,
    Dialog,
    Form,
    SelectInput,
    SelectUserInput,
  },

  props: {
    onSubmit: {
      type: Function,
    },
    toggleDialog: {
      type: Function,
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
    checked: [] as string[],
    errorMessage: '',
    itemType: 'Select Type' as itemType,
    itemTypeOptions,
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    showAlert: false,
    status: 'Select Status' as statusType,
    statusOptions,
    userOptions,
  }),

  computed: {
    priorityFilter(this: any) {
      return this.checked.filter((val: string) => val === 'priority').length === 1;
    },
    statusFilter(this: any) {
      return this.checked.filter((val: string) => val === 'status').length === 1;
    },
    itemTypeFilter(this: any) {
      return this.checked.filter((val: string) => val === 'type').length === 1;
    },
    assigneeFilter(this: any) {
      return this.checked.filter((val: string) => val === 'assignee').length === 1;
    },
  },

  methods: {
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    isValid(this: any) {
      const priority: boolean = !this.priorityFilter ? true :
        (this.priorityFilter && this.priority !== 'Select Priority');
      const status: boolean = !this.statusFilter ? true :
        (this.statusFilter && this.status !== 'Select Status');
      const type: boolean = !this.itemTypeFilter ? true :
        (this.itemTypeFilter && this.itemType !== 'Select Type');
      const assignee: boolean = !this.assigneeFilter ? true :
        (this.assigneeFilter && this.assigneeId);

      return priority && status && type && assignee;
    },
    submitDialog(this: any) {
      if (this.isValid()) {
        this.toggleDialog();
      }
    },
    onSubmitForm(this: any) {
      if (this.isValid()) {
        const conditions = [];
        if (this.priorityFilter) {
          conditions.push({
            field: 'priority',
            value: this.priority,
            condition: (item: Item | Feature) => item.priority === this.priority,
          });
        }
        if (this.statusFilter) {
          conditions.push({
            field: 'status',
            value: this.status,
            condition: (item: Item | Feature) => item.status === this.status,
          });
        }
        if (this.itemTypeFilter) {
          conditions.push({
            field: 'type',
            value: this.itemType,
            condition: (item: Item) => item.type === this.itemType,
          });
        }
        if (this.assigneeFilter) {
          conditions.push({
            field: 'assignee',
            value: this.assigneeId,
            condition: (item: Item | Feature) => item.assignee.id === this.assigneeId,
          });
        }
        this.onSubmit(conditions);
      } else {
        this.showAlert = true;
        if (this.priorityFilter && this.priority === 'Select Priority') {
          this.errorMessage = 'Priority';
        } else if (this.statusFilter && this.status === 'Select Status') {
          this.errorMessage = 'Status';
        } else if (this.itemTypeFilter && this.itemType === 'Select Type') {
          this.errorMessage = 'Item Type';
        } else if (this.assigneeFilter && !this.assigneeId) {
          this.errorMessage = 'Assignee';
        }
      }
    },
  },

  watch: {
    assigneeId(this: any) {
      this.showAlert = false;
    },
    assigneeFilter(this: any) {
      this.showAlert = false;
    },
    itemType(this: any) {
      this.showAlert = false;
    },
    itemTypeFilter(this: any) {
      this.showAlert = false;
    },
    priority(this: any) {
      this.showAlert = false;
    },
    priorityFilter(this: any) {
      this.showAlert = false;
    },
    status(this: any) {
      this.showAlert = false;
    },
    statusFilter(this: any) {
      this.showAlert = false;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.filterDialog {
  &_content {
    margin: 0 auto;
  }

  &_option {
    align-items: center;
    display: flex;
  }

  &_check {
    padding: 1rem 0;

    &-input {
      &:focus,
      &:hover {
        cursor: pointer;
      }
    }

    &-label {
      padding: 0 1rem 0 0.5rem;

      &:focus,
      &:hover {
        cursor: pointer;
      }
    }
  }
}

</style>
