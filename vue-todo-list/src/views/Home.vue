<template>
  <div class="home">
    <!-- <ProjectList /> -->
    <!-- <TodoList /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ProjectList from '@/components/ProjectList.vue';
import TodoList from '@/components/TodoList.vue';

@Component({
  components: {
    ProjectList,
    TodoList,
  },
})
export default class Home extends Vue {}
</script>
