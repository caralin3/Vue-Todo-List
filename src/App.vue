<template>
  <div id="app">
    <Header />
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Header from '@/components/Header.vue';
import './utils/filters';

export default Vue.extend({
  name: 'App',

  components: {
    Header,
  },
});
</script>
