<template>
  <div class="addFeature">
    <Dialog title="Add Feature" :toggleDialog="dismissDialog">
      <Form buttonText="Add Feature" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addFeature_dialog">
          <text-input :class="'addFeature_textInput'" label="Feature Name" placeholder="" v-model="title" />
          <select-user-input
            :class="'addFeature_select'"
            label="Assignee"
            v-model="assigneeId"
            :options="userOptions"
            :onBlur="() => null" 
            :onFocus="() => null"
          />
          <select-user-input
            :class="'addFeature_select'"
            label="Reporter"
            v-model="reporterId"
            :options="userOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <text-area-input
            :class="'addFeature_textAreaInput'"
            label="Feature Description"
            placeholder=""
            v-model="description"
          />
          <!-- <date-input :class="'addFeature_dateInput'" label="Start Date" v-model="startDate" />
          <date-input :class="'addFeature_dateInput'" label="End Date" v-model="endDate" /> -->
          <select-input
            :class="'addFeature_select'"
            label="Priority"
            v-model="priority"
            :options="priorityOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <select-input
            :class="'addFeature_select'"
            label="Status"
            v-model="status"
            :options="statusOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import ProjectList from '@/components/ProjectList.vue';
import ProjectsHeader from '@/components/ProjectsHeader.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { FirebaseFeature, User, statusType, priorityType, Version } from '@/types';
import { priorityOptions, statusOptions, userOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'AddFeatureDialog',

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
    startDate: new Date().toString(),
    status: 'todo' as statusType,
    statusOptions,
    title: '',
    userOptions,
  }),

  methods: {
    ...mapActions({
      addFeature: 'features/addFeature',
    }),
    dismissDialog(this: any) {
      this.toggleDialog();
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
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.addFeature {
  &_dialog {
    align-self: center;
  }

  &_textInput {
    display: grid;
    font-weight: bold;
    gap: 2.5rem;
    grid-template: "label input";
    width: 20rem;
  
    label {
      grid-area: label;
      width: 10rem;
    }
  
    input {
      grid-area: input;
    }

    @media only screen and (max-width: 640px) {
      gap: 1rem;
      grid-template: "label" "input";
      width: 80%;
    }
  }
  

  &_textAreaInput {
    display: grid;
    font-weight: bold;
    gap: 2.5rem;
    grid-template: "label input";
    width: 20rem;
  
    label {
      grid-area: label;
      width: 10rem;
    }
  
    input {
      grid-area: input;
      height: 5rem;
      width: 15rem;
    }

    @media only screen and (max-width: 640px) {
      gap: 1rem;
      grid-template: "label" "input";
      width: 80%;
    }
  }  

  // &_dateInput {
  //   display: grid;
  //   font-weight: bold;
  //   gap: 1rem;
  //   grid-template: "label input";
  
  //   label {
  //     grid-area: label;
  //     width: 10rem;
  //   }
  
  //   input {
  //     grid-area: input;
  //   }

  //   @media only screen and (max-width: 640px) {
  //     gap: 1rem;
  //     grid-template: "label" "input";
  //     width: 80%;
  //   }
  // }

  &_select {
    display: grid;
    font-weight: bold;
    gap: 2.5rem;
    grid-template: "label input";
  
    label {
      grid-area: label;
      width: 10rem;
    }
  
    select {
      grid-area: input;
      height: 2rem;
      width: 15rem;
    }

    @media only screen and (max-width: 640px) {
      gap: 1rem;
      grid-template: "label" "input";
      width: 80%;
    }
  }
}
</style>

