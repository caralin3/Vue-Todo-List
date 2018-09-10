<template>
  <p class="TextInput">
    <label class="TextInput_label" for="textInput">{{ label }}</label>
    <input
      class="TextInput_input"
      id="textInput"
      :value="text"
      :placeholder="placeholder"
      @input="onChange($event.target.value)"
      type="text"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
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
};
</script>
