<template>
  <div class="projects">
    <ProjectsHeader :toggleDialog="toggleDialog" />
    <ProjectList />
    <Dialog title="Create Project" :toggleDialog="toggleDialog" v-if="show">
      <Form buttonText="Add Project" :toggleDialog="toggleDialog" :submit="onSubmitForm">
        <div class="projects_dialog">
        <span class="projects_creatorLabel" :creator="creator">
          Creator
        </span>
        <span class="projects_username">{{ creator | name }}</span>
        <TextInput :class="'projects_textInput'" label="Project Name" placeholder="" v-model="title" />
        <TextAreaInput :class="'projects_textAreaInput'" label="Project Description" placeholder="" v-model="description" />
        <DateInput :class="'projects_dateInput'" label="Start Date" v-model="startDate" />
        <DateInput :class="'projects_dateInput'" label="End Date" v-model="endDate" />
        <SelectInput :class="'projects_selectStatus'" label="Status" v-model="status" :options="statusOptions" />
        <TextInput :class="'projects_textInput'" label="Version" placeholder="" v-model="version" />
        </div>
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
import { User1 } from '@/store/state';
import { Project, User, statusType } from '@/types';
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
  data: () => ({
    creator: User1 as User,
    description: '',
    endDate: '',
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
      const newProj: Project = {
        creator: this.creator,
        description: this.description,
        endDate: this.endDate,
        features: [],
        id: uid(8),
        startDate: this.startDate,
        status: this.status,
        title: this.title,
        updatedDate: this.startDate,
        versions: [this.version],
      };

      this.addProject(newProj);
    },
  },
})
export default class Projects extends Vue {}
</script>
