<template>
  <p class="selectInput">
    <label class="selectInput_label" :for="label">{{ label }}</label>
    <select
      class="selectInput_input"
      :id="label"
      :defaultValue="value.id"
      @blur="onBlur"
      @focus="onFocus"
      @change="onChange($event.target.value)"
    >
      <option v-if="option.firstName && option.lastName" v-for="(option, index) in options" :value="option.id" :key="index">{{ option | name }}</option>
    </select>
  </p>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SelectUserInput',

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
});
</script>

<style lang="less" scoped>
.selectInput {
  &_input {
    padding: 0.5rem;
  }
}
</style>
