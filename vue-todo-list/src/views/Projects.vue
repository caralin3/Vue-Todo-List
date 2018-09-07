<template>
  <div class="projects">
    <ProjectsHeader :toggleDialog="toggleDialog" />
    <ProjectList />
    <Dialog title="Create Project" :toggleDialog="toggleDialog" v-if="show">
      <h3>Create</h3>
      <Form buttonText="Add Project" :toggleDialog="toggleDialog">
        <TextInput label="Project Name" placeholder=" " text="projName" :onChange="onChange" />
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

@Component({
  components: {
    Dialog,
    Form,
    ProjectsHeader,
    ProjectList,
    TextInput,
  },
  data: () => ({
    projName: '',
    show: false,
  }),
  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    onChange(this: any) {
      console.log(this.projName);
    },
  },
})
export default class Projects extends Vue {}
</script>
