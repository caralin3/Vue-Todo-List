<template>
  <div class="comments">
    <div class="comments_header">
      <h3 class="comments_title">Comments</h3>
      <add-button :onClick="() => null" />
    </div>
    <div class="comments_container" v-if="comments && comments.length > 0">
      <div class="comments_details" v-for="comment in comments" :key="comment.id">
        <span class="comments_user">
          <i class="fas fa-user-circle" />
          <span class="comments_username">
            {{ comment.user | name }}
          </span>
          commented on
        </span>
        <span class="comments_date">
          {{ new Date(comment.startDate) | date }}
          {{ new Date(comment.startDate) | time }}
        </span>
        <span v-if="updatedComment.updatedDate || comment.updatedDate">
            updated on
        </span>
        <span class="comments_date" v-if="updatedComment.updatedDate && !comment.updatedDate">
          {{ new Date(updatedComment.updatedDate) | date }}
          {{ new Date(updatedComment.updatedDate) | time }}
        </span>
        <span class="comments_date" v-if="updatedComment.updatedDate || comment.updatedDate">
          {{ new Date(comment.updatedDate) | date }}
          {{ new Date(comment.updatedDate) | time }}
        </span>
        <p
          class="comments_text"
          contenteditable="true"
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
import AddButton from './AddButton.vue';
import { Comment } from '@/types';

export default Vue.extend({
  name: 'Comments',

  components: {
    AddButton,
  },

  props: {
    comments: {
      type: Array,
    },
  },

  data: () => ({
    updatedComment: {} as Comment,
  }),

  methods: {
    handleCommentChange(this: any, value: string, comm: Comment) {
      console.log(value);
      // this.updatedComment = {
      //   id: comm.id,
      //   startDate: comm.startDate.toString(),
      //   text: value,
      //   updatedDate: new Date().toString(),
      //   user: comm.user,
      // };
      // this.editComment(this.updatedComment);
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
    display: flex;
    justify-content: space-between;
  }

  &_container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &_details {
    background-color: @white;
    color: @madison;
    margin: 0 0 1rem 0;
    padding: 1rem 1rem 0;
    width: 90%;
  }

  &_username {
    font-weight: bold;
  }

  &_text {
    padding: 0.5rem;
    
    &:hover {
      border: 1px solid @madison;
      cursor: pointer;
    }
  }
}
</style>
