<template>
  <p class="PasswordInput">
    <label class="PasswordInput_label" for="passwordInput">{{ label }}</label>
    <input
      class="PasswordInput_input"
      id="passwordInput"
      :value="password"
      :placeholder="placeholder"
      @input="onChange($event.target.value)"
      @blur="onBlur"
      @focus="onFocus"
      type="password"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  props: {
    label: String,
    placeholder: String,
    password: String,
    onBlur: Function,
    onFocus: Function,
  },
  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', value);
    },
  },
};
</script>
