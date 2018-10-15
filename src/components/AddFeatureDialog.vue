<template>
  <div class="addFeature">
    <Dialog title="Add Feature" :toggleDialog="dismissDialog">
      <Form buttonText="Add Feature" :toggleDialog="submitDialog" :submit="onSubmitForm">
        <div class="addFeature_dialog">
          <alert v-if="showAlert" :text="`Missing required field: ${errorMessage}`" />
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
import Alert from '@/components/Alert.vue';
import DateInput from '@/components/DateInput.vue';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { FirebaseFeature, User, statusType, priorityType } from '@/types';
import { priorityOptions, statusOptions, userOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'AddFeatureDialog',

  components: {
    Alert,
    DateInput,
    Dialog,
    Form,
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
    errorMessage: '',
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
    showAlert: false,
    startDate: new Date().toString(),
    status: 'Select Status' as statusType,
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
    submitDialog(this: any) {
      if (this.isValid()) {
        this.toggleDialog();
      }
    },
    isValid(this: any) {
      return this.assigneeId &&
        this.description &&
        this.priority !== 'Select Priority' &&
        this.status !== 'Select Status' &&
        this.title;
    },
    onSubmitForm(this: any) {
      if (this.isValid()) {
        this.showAlert = false;
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
        };
        this.addFeature(newFeature);
      } else {
        this.showAlert = true;
        if (!this.assigneeId) {
          this.errorMessage = 'Assignee';
        } else if (this.priority === 'Select Priority') {
          this.errorMessage = 'Priority';
        } else if (this.status === 'Select Status') {
          this.errorMessage = 'Status';
        }
      }
    },
  },

  watch: {
    assigneeId(this: any) {
      for (const user of this.userOptions) {
        if (user.id === this.assigneeId) {
          this.assignee = user;
        }
      }
      this.showAlert = false;
    },
    priority(this: any) {
      this.showAlert = false;
    },
    reporterId(this: any) {
      this.showAlert = false;
      for (const user of this.userOptions) {
        if (user.id === this.reporterId) {
          this.reporter = user;
        }
      }
      this.showAlert = false;
    },
    status(this: any) {
      this.showAlert = false;
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

