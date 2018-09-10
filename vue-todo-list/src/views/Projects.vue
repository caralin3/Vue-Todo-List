<template>
  <div class="projects">
    <ProjectsHeader :toggleDialog="toggleDialog" />
    <ProjectList />
    <Dialog title="Create Project" :toggleDialog="toggleDialog" v-if="show">
      <h3>Create</h3>
      <Form buttonText="Add Project" :toggleDialog="toggleDialog" :submit="onSubmitForm">
        <TextInput label="Project Name" placeholder="" v-model="projName" />
        <DateInput label="Start Date" placeholder="" v-model="startDate" />
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import TextInput from '@/components/TextInput.vue';
import DateInput from '@/components/DateInput.vue';

@Component({
  components: {
    DateInput,
    Dialog,
    Form,
    ProjectsHeader,
    ProjectList,
    TextInput,
  },
  data: () => ({
    projName: '',
    startDate: new Date(),
    show: false,
  }),
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    onSubmitForm(this: any) {
      console.log('Projec Name: ', this.projName);
      console.log('Start Date: ', this.startDate);
    },
  },
})
export default class Projects extends Vue {}
</script>
