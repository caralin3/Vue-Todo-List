<template>
  <div class="addItem">
    <Dialog title="Add Item" :toggleDialog="dismissDialog">
      <Form buttonText="Add Item" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addItem_dialog">
          <SelectUserInput :class="'addFeature_select'" label="Assignee" v-model="assigneeId" :options="userOptions" :onBlur="() => null" :onFocus="() => null" />
          <SelectUserInput :class="'addFeature_select'" label="Reporter" v-model="reporterId" :options="userOptions" :onBlur="() => null" :onFocus="() => null" />
          <TextInput :class="'addItem_textInput'" label="Item Name" placeholder="" v-model="title" />
          <TextAreaInput :class="'addItem_textAreaInput'" label="Item Description" placeholder="" v-model="description" />
          <DateInput :class="'addItem_dateInput'" label="Start Date" v-model="startDate" />
          <DateInput :class="'addItem_dateInput'" label="End Date" v-model="endDate" />
          <SelectInput :class="'addItem_select'" label="Type" v-model="type" :options="itemTypeOptions" :onBlur="() => null" :onFocus="() => null" />
          <SelectInput :class="'addItem_select'" label="Priority" v-model="priority" :options="priorityOptions" :onBlur="() => null" :onFocus="() => null" />
          <SelectInput :class="'addItem_select'" label="Status" v-model="status" :options="statusOptions" :onBlur="() => null" :onFocus="() => null" />
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { Item, User, statusType, priorityType, Version, itemType } from '@/types';
import { getUserOptions, itemTypeOptions, priorityOptions, statusOptions } from '@/utils/constants';
import { uid } from '@/utils/guid';

@Component({
  components: {
    DateInput,
    Dialog,
    SelectInput,
    SelectUserInput,
    Form,
    ProjectsHeader,
    ProjectList,
    TextAreaInput,
    TextInput,
  },
  props: {
    toggleDialog: Function,
  },
  created(this: any) {
    this.userOptions = getUserOptions();
  },
  data: () => ({
    assignee: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    assigneeId: '',
    description: '',
    endDate: '',
    itemTypeOptions,
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    reporter: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    reporterId: '',
    startDate: new Date(),
    status: 'todo' as statusType,
    statusOptions,
    title: '',
    type: 'Select Type' as itemType,
    userOptions: [] as string[],
  }),
  methods: {
    ...mapActions('items', [
      'addItem',
    ]),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmitForm(this: any) {
      const newItem: Item = {
        assignee: this.assignee,
        description: this.description,
        endDate: this.endDate,
        // FIXME: Feature Id adding
        featureId: '',
        id: uid(8),
        priority: this.priority,
        reporter: this.reporter,
        startDate: this.startDate,
        status: this.status,
        title: this.title,
        type: this.type,
        updatedDate: this.startDate,
        // FIXME: Version adding
        version: {} as Version,
        // FIXME: Workflow adding
        workFlow: [],
      };
      this.addItem(newItem);
    },
  },
  watch: {
    assigneeId(this: any) {
      for (const user of this.userOptions) {
        if (user.id === this.assigneeId) {
          this.assignee = user;
        }
      }
    },
    reporterId(this: any) {
      for (const user of this.userOptions) {
        if (user.id === this.reporterId) {
          this.reporter = user;
        }
      }
    },
  },
})
export default class AddItemDialog extends Vue {}
</script>
