<template>
  <div class="description">
    <h3 class="description_title">Description</h3>
    <p 
      class="description_text"
      contenteditable="true"
      @blur="handleChange($event.target.innerText)"
    >
      {{ text }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Description',

  props: {
    onChange: {
      type: Function,
    },
    text: {
      default: '',
      type: String,
    },
  },

  methods: {
    handleChange(this: any, value: string) {
      this.onChange('description', value);
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.description {
  color: @madison;
  padding: 1rem 1rem 0;

  &_title {
    border-bottom: 1px solid @madison;
    padding-bottom: 0.5rem;
  }

  &_text {
    padding: 0.3rem 0.5rem;

    &:hover {
      border: 1px solid @madison;
      cursor: pointer;
    }
  }
}

</style>
