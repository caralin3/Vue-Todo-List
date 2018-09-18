<template>
  <div class="addProject">
    <Dialog title="Create Project" :toggleDialog="dismissDialog">
      <Form buttonText="Add Project" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addProject_dialog">
          <span class="addProject_creatorLabel" :currentUser="currentUser">
            Creator
          </span>
          <span class="addProject_username">{{ currentUser | name }}</span>
          <TextInput :class="'addProject_textInput'" label="Project Name" placeholder="" v-model="title" />
          <TextAreaInput :class="'addProject_textAreaInput'" label="Project Description" placeholder="" v-model="description" />
          <DateInput :class="'addProject_dateInput'" label="Start Date" v-model="startDate" />
          <DateInput :class="'addProject_dateInput'" label="End Date" v-model="endDate" />
          <SelectInput :class="'addProject_selectStatus'" label="Status" v-model="status" :options="statusOptions" :onBlur="() => null" :onFocus="() => null" />
          <TextInput :class="'addProject_textInput'" label="Version" placeholder="" v-model="versionName" />
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapActions, mapState } from 'vuex';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { RootState } from '@/store/types';
import { FirebaseProject, Project, User, statusType } from '@/types';
import { statusOptions } from '@/utils/constants';
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
    description: '',
    endDate: '',
    startDate: new Date().toString(),
    status: 'todo' as statusType,
    statusOptions,
    title: '',
    versionName: String,
  }),
  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
    }),
  },
  methods: {
    ...mapActions('projects', [
      'addProject',
    ]),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmitForm(this: any) {
      const newProj: FirebaseProject = {
        creator: this.currentUser,
        description: this.description,
        endDate: this.endDate,
        features: [],
        startDate: this.startDate,
        status: this.status,
        title: this.title,
        updatedDate: this.startDate,
        // FIXME: Version adding
        versions: [this.versionName],
      };
      this.addProject(newProj);
    },
  },
})
export default class AddProjectDialog extends Vue {}
</script>
