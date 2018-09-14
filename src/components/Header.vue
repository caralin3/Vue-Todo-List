<template>
  <div class="header">
    <h1 class="header_title">Todo</h1>
    <div class="header_nav">
      <router-link to="/" :exact="true">Home</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/board">Boards</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
export default class Header extends Vue {}
</script>

<style lang="less">
@import '../less/index.less';
</style>
