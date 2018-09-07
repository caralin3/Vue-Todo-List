<template>
  <p class="TextInput">
    <label class="TextInput_label" for="textInput">{{ label }}</label>
    <input
      class="TextInput_input"
      id="textInput"
      v-model="text"
      :placeholder="placeholder"
      @change="onChange"
    />
  </p>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  props: {
    label: String,
    placeholder: String,
    text: String,
  },
  // data: () => ({
  //   text: '',
  // }),
  methods: {
    ...mapActions('projects', [
      'addProject',
    ]),
    onChange(this: any) {
      this.onChange();
    },
  },
};
</script>
