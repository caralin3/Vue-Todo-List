<template>
  <div class="addComment">
    <Dialog title="Add Comment" :toggleDialog="dismissDialog">
      <Form buttonText="Add Comment" :toggleDialog="dismissDialog" :submit="onSubmitForm">
        <div class="addComment_dialog">
          <text-area-input :class="'addComment_textAreaInput'" label="Comment" placeholder="" v-model="text" />
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
import TextAreaInput from '@/components/TextAreaInput.vue';
import { FirebaseComment, RootState } from '@/types';

export default Vue.extend({
  name: 'AddLinkDialog',

  components: {
    Dialog,
    Form,
    TextAreaInput,
  },

  props: {
    toggleDialog: {
      type: Function,
    },
  },

  data: () => ({
    text: '',
  }),

  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
    }),
  },

  methods: {
    ...mapActions({
      addComment: 'comments/addComment',
    }),
    dismissDialog(this: any) {
      this.toggleDialog();
    },
    onSubmitForm(this: any) {
      const filter = this.$route.query.filter;
      const newComment = {
        featureId: filter === 'features' ? this.$route.query.id : '',
        itemId: filter === 'items' ? this.$route.query.id : '',
        startDate: new Date().toString(),
        text: this.text,
        user: this.currentUser,
        updatedDate: new Date().toString(),
      };
      console.log(newComment);
      this.addComment(newComment);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.addComment {
  &_dialog {
    align-self: center;
  }

  &_textAreaInput {
    display: grid;
    font-weight: bold;
    gap: 2.5rem;
    grid-template: "label input";
    // width: 20rem;
  
    label {
      grid-area: label;
      // width: 10rem;
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

