<template>
  <p class="selectInput">
    <label class="selectInput_label" for="selectInput">{{ label }}</label>
    <select
      class="selectInput_input"
      id="selectInput"
      :defaultValue="value"
      @blur="onBlur"
      @focus="onFocus"
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
    onBlur: Function,
    onFocus: Function,
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
