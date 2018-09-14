<template>
  <div>
    <h1>Todos {{ todoItems }}</h1>
    <button type="button" v-on:click="removeTodo({id: '1', title: 'Item 2', status: 'todo', type: 'none'})">+</button>
    <button type="button" v-on:click="addTodo({id: '1', title: 'Item 2', status: 'todo', type: 'none'})">+</button>
    <ul v-for="(item, index) in todos" v-bind:key="index">
      <li>{{ item.title }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';

export default {
  computed: {
    ...mapState({
      todos: (state: any) => state.todo.todos,
    }),
    ...mapGetters('todo', {
      todoItems: 'todoCount',
    }),
  },
  methods: {
    ...mapActions('todo', [
      'addTodo',
      'removeTodo',
    ]),
  },
};
</script>
