<template>
  <p class="PasswordInput">
    <label class="PasswordInput_label" :for="label">{{ label }}</label>
    <input
      class="PasswordInput_input"
      :id="label"
      :value="password"
      :placeholder="placeholder"
      @input="onChange($event.target.value)"
      autocomplete="off"
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
  },
  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', value);
    },
  },
};
</script>
