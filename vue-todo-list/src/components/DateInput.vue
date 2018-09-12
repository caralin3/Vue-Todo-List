<template>
  <p class="dateInput">
    <label class="dateInput_label" for="dateInput">{{ label }}</label>
    <input
      class="dateInput_input"
      id="dateInput"
      :value="date"
      @input="onChange($event.target.value)"
      @blur="onBlur"
      @focus="onFocus"
      type="datetime-local"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  props: {
    label: String,
    date: Date,
    onBlur: Function,
    onFocus: Function,
  },
  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', new Date(value));
    },
  },
};
</script>
