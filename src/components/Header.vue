<template>
  <div class="header">
    <h1>
      <router-link class="header_title" to="/" :exact="true">Todo</router-link>
    </h1>
    <div class="header_nav">
      <router-link to="/" :exact="true">Home</router-link>
      <router-link to="/projects">Projects</router-link>
      <router-link to="/board">Boards</router-link>
      <router-link v-if="!loggedIn" class="header_nav-login" to="/login">Log In</router-link>
      <button v-else class="header_nav-logout" @click="onLogOut">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';

export default {
  created(this: any) {
    if (this.currentUser) {
      this.loggedIn = true;
    }
  },
  data: () => ({
    currentUser: firebase.auth().currentUser,
    loggedIn: false,
  }),
  methods: {
    onLogOut(this: any) {
      firebase.auth().signOut().then(
        () => {
          console.log('Logged Out');
          this.$router.replace('/login');
          this.currentUser = firebase.auth().currentUser;
        },
        (err: any) => {
          console.log('Error', err.message);
        },
      );
    },
  },
  watch: {
    currentUser(this: any) {
      if (this.currentUser) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    },
  },
};
</script>

<style lang="less">
@import '../less/index.less';
</style>
