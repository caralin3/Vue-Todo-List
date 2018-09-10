<template>
  <div class="projects">
    <ProjectsHeader :toggleDialog="toggleDialog" />
    <ProjectList />
    <Dialog title="Create Project" :toggleDialog="toggleDialog" v-if="show">
      <Form buttonText="Add Project" :toggleDialog="toggleDialog" :submit="onSubmitForm">
        <span :creator="creator">Creator: <span>{{ creator | name }}</span></span>
        <TextInput label="Project Name" placeholder="" v-model="title" />
        <TextAreaInput label="Project Description" placeholder="" v-model="description" />
        <DateInput label="Start Date" v-model="startDate" />
        <DateInput label="End Date" v-model="endDate" />
        <SelectInput label="Status" v-model="status" :options="statusOptions" />
        <TextInput label="Version" placeholder="" v-model="version" />
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import SelectInput from '@/components/SelectInput.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { User, statusType } from '@/types';
import { statusOptions } from '@/utils/constants';

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
  data: () => ({
    creator: {} as User,
    description: '',
    endDate: new Date(),
    title: '',
    startDate: new Date(),
    status: 'todo' as statusType,
    show: false,
    version: String,
    statusOptions,
  }),
  methods: {
    ...mapActions('projects', [
      'addProject',
    ]),
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    onSubmitForm(this: any) {
      console.log('Creator: ', this.creator);
      console.log('Projec Title: ', this.title);
      console.log('Project Description: ', this.description);
      console.log('Start Date: ', this.startDate);
      console.log('End Date: ', this.endDate);
      console.log('Version: ', this.version);
      console.log('Status: ', this.status);
    },
  },
})
export default class Projects extends Vue {}
</script>
