<template>
  <div class="description">
    <h3 class="description_title">Description</h3>
    <p 
      class="description_text"
      contenteditable="true"
      @blur="handleTextChange($event.target.innerText)"
    >
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';

export default Vue.extend({
  name: 'Description',

  props: {
    text: {
      default: '',
      type: String,
    },
  },

  methods: {
    ...mapActions({
      editFeature: 'features/editFeature',
      editItem: 'items/editItem',
    }),
    handleTextChange(this: any, value: string) {
      console.log(value);
    //   this.updatedFeature = {
    //     ...this.updatedFeature,
    //     description: value,
    //     startDate: new Date(this.updatedFeature.startDate).toString(),
    //     updatedDate: new Date().toString(),
    //   };
    //   this.editFeature(this.updatedFeature);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.description {
  &_text {
    padding: 0.3rem 0.5rem;

    &:hover {
      border: 1px solid @madison;
      cursor: pointer;
    }
  }
}

</style>
