<template>
  <p class="textInput">
    <label class="textInput_label" :for="label">{{ label }}</label>
    <input
      class="textInput_input"
      :id="label"
      :value="text"
      :placeholder="placeholder"
      @input="onChange($event.target.value)"
      type="text"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TextInput',

  props: {
    label: String,
    placeholder: String,
    text: String,
  },

  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', value);
    },
  },
});
</script>
