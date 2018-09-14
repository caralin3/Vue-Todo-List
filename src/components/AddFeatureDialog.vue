<template>
  <div class="addFeature">
    <Dialog title="Add Feature" :toggleDialog="dismissDialog">
      <Form buttonText="Add Feature" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addFeature_dialog">
          <TextInput :class="'addFeature_textInput'" label="Feature Name" placeholder="" v-model="title" />
          <SelectInput :class="'addFeature_select'" label="Assignee" v-model="assignee" :options="userOptions" :onBlur="() => null" :onFocus="() => null" />
          <SelectInput :class="'addFeature_select'" label="Reporter" v-model="reporter" :options="userOptions" :onBlur="() => null" :onFocus="() => null" />
          <TextAreaInput :class="'addFeature_textAreaInput'" label="Feature Description" placeholder="" v-model="description" />
          <DateInput :class="'addFeature_dateInput'" label="Start Date" v-model="startDate" />
          <DateInput :class="'addFeature_dateInput'" label="End Date" v-model="endDate" />
          <SelectInput :class="'addFeature_select'" label="Priority" v-model="priority" :options="priorityOptions" :onBlur="() => null" :onFocus="() => null" />
          <SelectInput :class="'addFeature_select'" label="Status" v-model="status" :options="statusOptions" :onBlur="() => null" :onFocus="() => null" />
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
import SelectInput from '@/components/SelectInput.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { User1 } from '@/store/state';
import { Feature, User, statusType, priorityType, Version } from '@/types';
import { priorityOptions, statusOptions } from '@/utils/constants';
import { uid } from '@/utils/guid';

@Component({
  components: {
    DateInput,
    Dialog,
    SelectInput,
    Form,
    ProjectsHeader,
    ProjectList,
    TextAreaInput,
    TextInput,
  },
  props: {
    toggleDialog: Function,
  },
  data: () => ({
    assignee: String,
    description: '',
    endDate: '',
    priority: 'Select Priority' as priorityType,
    priorityOptions,
    reporter: String,
    startDate: new Date(),
    status: 'todo' as statusType,
    statusOptions,
    title: '',
    // FIXME:
    userOptions: ['First Last', 'Second Last'],
  }),
  methods: {
    ...mapActions('features', [
      'addFeature',
    ]),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmitForm(this: any) {
      const newFeature: Feature = {
        assignee: this.assignee,
        description: this.description,
        endDate: this.endDate,
        items: [],
        id: uid(8),
        priority: this.priority,
        reporter: this.reporter,
        startDate: this.startDate,
        status: this.status,
        title: this.title,
        updatedDate: this.startDate,
        // FIXME: Version adding
        version: {} as Version,
        // FIXME: Workflow adding
        workFlow: [],
      };
      this.addFeature(newFeature);
    },
  },
})
export default class AddFeatureDialog extends Vue {}
</script>
