<template>
  <div class="addItem">
    <Dialog title="Add Item" :toggleDialog="dismissDialog">
      <Form buttonText="Add Item" :toggleDialog="submitDialog" :submit="onSubmitForm">
        <div class="addItem_dialog">
          <text-input :class="'addItem_textInput'" label="Item Name" placeholder="" v-model="title" />
          <select-user-input
            :class="'addItem_select'"
            label="Assignee"
            v-model="assigneeId"
            :options="userOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <select-user-input
            :class="'addItem_select'"
            label="Reporter"
            v-model="reporterId"
            :options="userOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <span class="addItem_feature" v-if="this.$route.query.filter === 'features'">
            Feature
          </span>
          <span class="addItem_featureTitle" v-if="this.$route.query.filter === 'features'">
            {{ feature.title }}
          </span>
          <select-feature-input
            v-if="this.$route.query.filter === 'items'"
            :class="'addItem_select'" 
            label="Feature"
            v-model="featureId"
            :options="featureOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <text-area-input
            :class="'addItem_textAreaInput'"
            label="Item Description"
            placeholder=""
            v-model="description"
          />
          <select-input
            :class="'addItem_select'"
            label="Type"
            v-model="type"
            :options="itemTypeOptions" 
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <select-input
            :class="'addItem_select'"
            label="Priority" v-model="priority"
            :options="priorityOptions"
            :onBlur="() => null"
            :onFocus="() => null"
          />
          <select-input
            :class="'addItem_select'"
            label="Status" v-model="status"
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
import SelectFeatureInput from '@/components/SelectFeatureInput.vue';
import SelectInput from '@/components/SelectInput.vue';
import SelectUserInput from '@/components/SelectUserInput.vue';
import TextAreaInput from '@/components/TextAreaInput.vue';
import TextInput from '@/components/TextInput.vue';
import { Feature, FirebaseItem, itemType, priorityType, statusType, User } from '@/types';
import { featureOptions, itemTypeOptions, priorityOptions, statusOptions, userOptions } from '@/utils/constants';

export default Vue.extend({
  name: 'AddItemDialog',

  components: {
    DateInput,
    Dialog,
    SelectFeatureInput,
    SelectInput,
    SelectUserInput,
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
    assignee: {
      email: '',
      firstName: 'Select',
      id: '',
      lastName: 'User',
    } as User,
    assigneeId: '',
    description: '',
    endDate: '',
    feature: {} as Feature,
    featureId: '',
    featureOptions,
    itemTypeOptions,
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
    status: 'Select Status' as statusType,
    statusOptions,
    title: '',
    type: 'Select Type' as itemType,
    userOptions,
  }),

  created(this: any) {
    if (this.$route.query.id) {
      this.feature = this.features.filter((f: Feature) => f.id === this.$route.query.id)[0];
    }
  },

  computed: {
    ...mapState({
      features: (state: any) => state.features.features,
    }),
  },

  methods: {
    ...mapActions('items', [
      'addItem',
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
      return this.assigneeId &&
        this.description &&
        this.priority !== 'Select Priority' &&
        this.status !== 'Select Status' &&
        this.title &&
        this.type !== 'Select Type';
    },
    onSubmitForm(this: any) {
      if (this.$route.query.id) {
        this.featureId = this.$route.query.id;
      }
      if (this.isValid()) {
        const newItem: FirebaseItem = {
          assignee: this.assignee,
          description: this.description,
          endDate: this.endDate,
          featureId: this.featureId,
          priority: this.priority,
          projectId: this.$route.params.id,
          reporter: this.reporter,
          startDate: this.startDate.toString(),
          status: this.status,
          title: this.title,
          type: this.type,
          updatedDate: this.startDate.toString(),
        };
        this.addItem(newItem);
      } else {
        console.log('Missing');
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

.addItem {
  &_dialog {
    align-self: center;
  }

  &_feature {
    font-weight: bold;
    padding-right: 6rem;
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

