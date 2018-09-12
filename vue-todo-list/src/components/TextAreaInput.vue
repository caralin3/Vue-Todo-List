<template>
  <p class="textAreaInput">
    <label class="textAreaInput_label" for="textAreaInput">{{ label }}</label>
    <textarea
      class="textAreaInput_input"
      id="textAreaInput"
      :value="text"
      :placeholder="placeholder"
      @input="onChange($event.target.value)"
      @blur="onBlur"
      @focus="onFocus"
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
