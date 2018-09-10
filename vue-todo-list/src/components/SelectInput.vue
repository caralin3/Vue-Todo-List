<template>
  <p class="SelectInput">
    <label class="SelectInput_label" for="selectInput">{{ label }}</label>
    <select
      class="SelectInput_input"
      id="selectInput"
      :defaultValue="value"
      @change="onChange($event.target.value)"
    >
      <option v-for="(option, index) in options" :value="option" :key="index">{{ option | capitalize }}</option>
    </select>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default {
  props: {
    label: String,
    options: Array,
    value: String,
  },
  methods: {
    onChange(this: any, value: string) {
      this.$emit('input', value);
    },
  },
};
</script>
