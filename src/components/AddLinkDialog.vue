<template>
  <div class="addLink">
    <Dialog title="Add Link" :toggleDialog="dismissDialog">
      <Form buttonText="Add Link" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addLink_dialog">
          <text-input :class="'addLink_textInput'" label="Link" placeholder="" v-model="link" />
        </div>
      </Form>
    </Dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Dialog from '@/components/Dialog.vue';
import Form from '@/components/Form.vue';
import TextInput from '@/components/TextInput.vue';
import { FirebaseLink, RootState } from '@/types';

export default Vue.extend({
  name: 'AddLinkDialog',

  components: {
    Dialog,
    Form,
    TextInput,
  },

  props: {
    toggleDialog: {
      type: Function,
    },
  },

  data: () => ({
    link: '',
  }),

  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
    }),
  },

  methods: {
    ...mapActions({
      addLink: 'links/addLink',
    }),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmitForm(this: any) {
      const filter = this.$route.query.filter;
      const newLink = {
        featureId: filter === 'features' ? this.$route.query.id : '',
        itemId: filter === 'items' ? this.$route.query.id : '',
        startDate: new Date().toString(),
        to: this.link,
        userId: this.currentUser.id,
        updatedDate: new Date().toString(),
      };
      console.log(newLink);
      this.addLink(newLink);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.addLink {
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
}
</style>

