<template>
  <div class="comments">
    <add-comment-dialog v-if="show" :toggle-dialog="toggleDialog" />
    <div class="comments_header">
      <h3 class="comments_title">Comments</h3>
      <add-button :onClick="toggleDialog" />
    </div>
    <div class="comments_container" v-if="comments && comments.length > 0">
      <div class="comments_details" v-for="comment in comments" :key="comment.id">
        <span class="comments_user">
          <i class="fas fa-user-circle" />
          <span class="comments_username">
            {{ comment.user | name }}
          </span>
          <span 
            v-if="new Date(comment.startDate).toString() === new Date(comment.updatedDate).toString()"
          >
            commented on
          </span>
        </span>
        <span 
          class="comments_date" 
          v-if="new Date(comment.startDate).toString() === new Date(comment.updatedDate).toString()"
        >
          {{ new Date(comment.startDate) | date }}
          {{ new Date(comment.startDate) | time }}
        </span>
        <span v-if="new Date(comment.startDate).toString() !== new Date(comment.updatedDate).toString()
          && (updatedComment.updatedDate || comment.updatedDate)">
            edited on
        </span>
        <span
          class="comments_date" 
          v-if="new Date(comment.startDate).toString() !== new Date(comment.updatedDate).toString() &&
          (updatedComment.updatedDate && !comment.updatedDate)"
        >
          {{ new Date(updatedComment.updatedDate) | date }}
          {{ new Date(updatedComment.updatedDate) | time }}
        </span>
        <span
          class="comments_date"
          v-if="new Date(comment.startDate).toString() !== new Date(comment.updatedDate).toString() &&
          (updatedComment.updatedDate || comment.updatedDate)"
        >
          {{ new Date(comment.updatedDate) | date }}
          {{ new Date(comment.updatedDate) | time }}
        </span>
        <delete-button
          class="comments_delete"
          v-if="currentUser.id === comment.user.id"
          :on-click="() => deleteComment(comment)"
        />
        <p
          class="comments_text"
          :class="{'comments_text-edit': currentUser.id === comment.user.id}"
          :contenteditable="currentUser.id === comment.user.id"
          @blur="handleCommentChange($event.target.innerText, comment)"
        >
          {{ comment.text }}
        </p>
      </div>
    </div>
    <div class="comments_container" v-else>
      <p class="comments_noComments">No comments</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import AddButton from './AddButton.vue';
import AddCommentDialog from './AddCommentDialog.vue';
import DeleteButton from './DeleteButton.vue';
import { Comment, RootState } from '@/types';

export default Vue.extend({
  name: 'Comments',

  components: {
    AddButton,
    AddCommentDialog,
    DeleteButton,
  },

  props: {
    comments: {
      type: Array,
    },
  },

  data: () => ({
    show: false,
    updatedComment: {} as Comment,
  }),

  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
    }),
  },

  methods: {
    ...mapActions({
      editComment: 'comments/editComment',
      removeComment: 'comments/removeComment',
    }),
    handleCommentChange(this: any, value: string, comm: Comment) {
      this.updatedComment = {
        featureId: comm.featureId || '',
        id: comm.id,
        itemId: comm.itemId || '',
        projectId: comm.projectId,
        startDate: comm.startDate.toString(),
        text: value,
        updatedDate: new Date().toString(),
        user: comm.user,
      };
      this.editComment(this.updatedComment);
    },
    toggleDialog(this: any) {
      this.show = !this.show;
    },
    deleteComment(this: any, comm: Comment) {
      this.removeComment(comm);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.comments {
  padding: 1rem;

  &_header {
    align-items: center;
    border-bottom: 1px solid @madison;
    display: flex;
    justify-content: space-between;
  }

  &_title {
    margin: 0;
  }

  &_container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
  }

  &_details {
    background-color: @white;
    color: @madison;
    margin: 0 0 1rem 0;
    padding: 1rem 1rem 0;
    width: 90%;

    &:hover {
      .comments_delete {
        cursor: pointer;
        opacity: 1;
      }
    }
  }

  &_username {
    font-weight: bold;
  }

  &_text {
    padding: 0.5rem;

    &-edit {
      &:hover {
        border: 1px solid @madison;
        cursor: pointer;
      }
    }
  }

  &_delete {
    // padding: 0 1rem;
    float: right;
    opacity: 0;
  }
}
</style>
