<template>
  <p class="textInput">
    <label class="textInput_label" for="textInput">{{ label }}</label>
    <input
      class="textInput_input"
      id="textInput"
      :value="text"
      :placeholder="placeholder"
      @blur="onBlur"
      @focus="onFocus"
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
    onBlur: Function,
    onFocus: Function,
    text: String,
  },
  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', value);
    },
  },
};
</script>
