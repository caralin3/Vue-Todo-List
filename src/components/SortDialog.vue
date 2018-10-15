<template>
  <div class="sortDialog">
    <Dialog title="Sort By" :toggleDialog="dismissDialog">
      <Form buttonText="Sort" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="sortDialog_content">
          <div class="sortDialog_option" v-for="(option, index) in options" :key="index">
            <input class="sortDialog_option-input" :id="option.text" type="radio" v-model="sort" :value="option" />
            <label class="sortDialog_option-label" :for="option.text">{{ option.text }}</label>
          </div>
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';

export default Vue.extend({
  name: 'SortDialog',

  components: {
    Dialog,
    Form,
  },

  props: {
    onSubmit: {
      type: Function,
    },
    toggleDialog: {
      type: Function,
    },
  },

  data: () => ({
    options: [
      {
        id: 'updatedDate',
        dir: 'desc',
        text: 'Recently Updated',
      }, {
        id: 'title',
        dir: 'asc',
        text: 'Alphabetically A - Z',
      }, {
        id: 'title',
        dir: 'desc',
        text: 'Alphabetically Z - A',
      }, {
        id: 'startDate',
        dir: 'desc',
        text: 'Created Date: Newest - Oldest',
      }, {
        id: 'startDate',
        dir: 'asc',
        text: 'Created Date: Oldest - Newest',
      },
    ],
    sort: {},
  }),

  methods: {
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmitForm(this: any) {
      if (this.sort !== {}) {
        this.onSubmit(this.sort);
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.sortDialog {
  &_content {
    align-self: center;
  }

  &_option {
    padding: 0.5rem;

    &-input {
      &:focus,
      &:hover {
        cursor: pointer;
      }
    }

    &-label {
      padding: 0 0.5rem;

      &:focus,
      &:hover {
        cursor: pointer;
      }
    }
  }
}

</style>
