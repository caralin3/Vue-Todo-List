<template>
  <p class="DateInput">
    <label class="DateInput_label" for="dateInput">{{ label }}</label>
    <input
      class="DateInput_input"
      id="dateInput"
      :value="date"
      :placeholder="placeholder"
      @input="onChange($event.target.value)"
      type="date"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  props: {
    label: String,
    placeholder: String,
    date: String,
  },
  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', value);
    },
  },
};
</script>
