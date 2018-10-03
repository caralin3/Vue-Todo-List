<template>
  <div class="addProject">
    <Dialog title="Create Project" :toggleDialog="dismissDialog">
      <Form buttonText="Add Project" :toggleDialog="submitDialog" :submit="onSubmitForm">
        <div class="addProject_dialog">
          <span class="addProject_creatorLabel" :currentUser="currentUser">
            Creator
          </span>
          <span class="addProject_username">{{ currentUser | name }}</span>
          <text-input :class="'addProject_textInput'" label="Project Name" placeholder="" v-model="title" />
          <text-area-input
            :class="'addProject_textAreaInput'"
            label="Project Description"
            placeholder=""
            v-model="description"
          />
          <select-input
            :class="'addProject_selectStatus'"
            label="Status"
            v-model="status"
            :options="statusOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <text-input :class="'addProject_textInput'" label="Version" placeholder="" v-model="version" />
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
import SelectInput from '@/components/SelectInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { FirebaseProject, Project, RootState, statusType, User } from '@/types';
import { statusOptions } from '@/utils/constants';


export default Vue.extend({
  name: 'AddProjectDialog',

  components: {
    DateInput,
    Dialog,
    SelectInput,
    Form,
    TextAreaInput,
    TextInput,
  },

  props: {
    toggleDialog: {
      type: Function,
    },
  },

  data: () => ({
    description: '',
    endDate: '',
    startDate: new Date().toString(),
    status: 'todo' as statusType,
    statusOptions,
    title: '',
    version: '',
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
    submitDialog(this: any) {
      if (this.isValid()) {
        this.toggleDialog();
      }
    },
    isValid(this: any) {
      return this.description &&
        this.status &&
        this.title &&
        this.version;
    },
    onSubmitForm(this: any) {
      if (this.isValid()) {
        const newProj: FirebaseProject = {
          creator: this.currentUser,
          description: this.description,
          endDate: this.endDate.toString(),
          features: [],
          startDate: this.startDate.toString(),
          status: this.status,
          title: this.title,
          updatedDate: this.startDate.toString(),
          users: [this.currentUser.id],
          version: this.version,
        };
        this.addProject(newProj);
      } else {
        console.log('Missing');
      }
    },
  },
});
</script>

<style lang="less" scoped>
.addProject {
  &_dialog {
    align-self: center;
  }

  &_creatorLabel {
    font-weight: bold;
    padding-right: 12rem;
    
    @media only screen and (max-width: 640px) {
      padding-right: 1rem;
    }
  }

  &_textInput {
    display: grid;
    font-weight: bold;
    gap: 2.5rem;
    grid-template: "label input";
  
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
    gap: 4.5rem;
    grid-template: "label input";
    justify-content: left;
    width: 100%;
  
    label {
      grid-area: label;
      margin: auto;
      width: 100%;
    }
  
    input {
      grid-area: input;
      height: 5rem;
    }

    @media only screen and (max-width: 640px) {
      gap: 1.5rem;
      grid-template: "label" "input";
      width: 80%;
    }
  }

  &_selectStatus {
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
