<template>
  <div class="addUser">
    <Dialog title="Add Collaborator" :toggleDialog="dismissDialog">
      <Form buttonText="Add" :toggleDialog="submitDialog" :submit="onSubmitForm">
        <div class="addUser_dialog">
          <alert v-if="showAlert" text="User already belongs to project" />
          <select-user-input
            :class="'addUser_select'"
            label="User"
            v-model="userId"
            :options="userOptions"
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
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import { Project, User } from '@/types';
import { userOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'AddUserDialog',

  components: {
    Alert,
    Dialog,
    Form,
    SelectUserInput,
  },

  props: {
    proj: {
      type: Object,
    },
    toggleDialog: {
      type: Function,
    },
  },

  data: () => ({
    showAlert: false,
    updatedProj: {} as Project,
    userId: '',
    userOptions,
  }),

  created(this: any) {
    this.updatedProj = this.proj;
  },

  methods: {
    ...mapActions({
      editProject: 'projects/editProject',
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
      return this.userId && !this.updatedProj.users.includes(this.userId);
    },
    onSubmitForm(this: any) {
      if (this.isValid()) {
        const users = [...this.updatedProj.users];
        users.push(this.userId);
        this.updatedProj = {
          ...this.updatedProj,
          users,
          endDate: this.updatedProj.endDate,
          startDate: new Date(this.updatedProj.startDate).toString(),
          updatedDate: new Date().toString(),
        };
        this.editProject(this.updatedProj);
        this.toggleDialog();
      } else {
        this.showAlert = true;
      }
    },
  },

  watch: {
    userId(this: any) {
      this.showAlert = false;
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.addUser {
  &_dialog {
    align-self: center;
  }

  &_select {
    align-items: center;
    display: grid;
    font-weight: bold;
    gap: 1.5rem;
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

