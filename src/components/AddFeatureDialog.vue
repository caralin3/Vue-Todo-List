<template>
  <div class="addFeature">
    <Dialog title="Add Feature" :toggleDialog="dismissDialog">
      <Form buttonText="Add Feature" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addFeature_dialog">
          <TextInput :class="'addFeature_textInput'" label="Feature Name" placeholder="" v-model="title" />
          <SelectUserInput :class="'addFeature_select'" label="Assignee" v-model="assigneeId" :options="userOptions" :onBlur="() => null" :onFocus="() => null" />
          <SelectUserInput :class="'addFeature_select'" label="Reporter" v-model="reporterId" :options="userOptions" :onBlur="() => null" :onFocus="() => null" />
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
import * as admin from 'firebase-admin';
import { Component, Vue } from 'vue-property-decorator';
import { mapActions } from 'vuex';
import * as fb from '@/firebase';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { User1 } from '@/store/state';
import { FirebaseFeature, User, statusType, priorityType, Version, Feature } from '@/types';
import { getUserOptions, priorityOptions, statusOptions } from '@/utils/constants';
import { uid } from '@/utils/guid';

@Component({
  components: {
    DateInput,
    Dialog,
    Form,
    ProjectsHeader,
    ProjectList,
    SelectInput,
    SelectUserInput,
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
    userOptions: [] as string[],
  }),
  methods: {
    ...mapActions({
      addFeature: 'features/addFeature',
      editProject: 'projects/editProject',
    }),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    updateProject(this: any, feature: Feature) {
      const projId = this.$route.params.id;
      // fb.projectsCollection.doc(projId).get().then((docs: any) => {
      //   console.log(docs);
      // })
      fb.projectsCollection.doc(projId).update({
        features: admin.firestore.FieldValue.arrayUnion(feature),
      }).then((proj) => {
        console.log(projId);
        console.log(feature);
        console.log(proj);
        // const newProj = {
        //   ...proj,
        //   startDate: new Date(proj.startDate),
        //   updatedDate: new Date(proj.updatedDate),
        // };
        // if (proj.endDate) {
        //   newProj.endDate = new Date(proj.endDate);
        // }
        // commit(MutationType.EDIT_PROJECT, newProj);
      }).catch((err: any) => {
        console.log(err.message);
      });
    },
    onSubmitForm(this: any) {
      const newFeature: FirebaseFeature = {
        assignee: this.assignee,
        description: this.description,
        endDate: this.endDate,
        items: [],
        priority: this.priority,
        projectId: this.$route.params.id,
        reporter: this.reporter,
        startDate: this.startDate.toString(),
        status: this.status,
        title: this.title,
        updatedDate: this.startDate.toString(),
        // FIXME: Version adding
        version: {} as Version,
        // FIXME: Workflow adding
        workFlow: [],
      };
      this.addFeature(newFeature);
      this.updateProject(newFeature);
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
export default class AddFeatureDialog extends Vue {}
</script>
