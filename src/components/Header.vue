<template>
  <div class="header">
    <h1>
      <router-link class="header_title" :to="currentUser === null ? '/' : '/projects'" :exact="true">Todo</router-link>
    </h1>
    <div class="header_nav">
      <router-link v-if="currentUser === null" to="/" :exact="true">Home</router-link>
      <router-link v-if="currentUser !== null" to="/projects">Projects</router-link>
      <router-link v-if="currentUser !== null" to="/board">Boards</router-link>
      <router-link v-if="currentUser === null" class="header_nav-login" to="/login">Log In</router-link>
      <button v-if="currentUser !== null" class="header_nav-logout" @click="onLogOut">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import * as fb from '@/firebase';
import { RootState } from '@/store/types';

export default {
  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
      userProfile: (state: RootState) => state.userProfile,
    }),
  },
  methods: {
    ...mapActions([
      'resetData',
    ]),
    onLogOut(this: any) {
      fb.auth.signOut().then(
        () => {
          this.resetData();
          this.$router.replace('/login');
        },
        (err: any) => {
          console.log('Error', err.message);
        },
      );
    },
  },
};
</script>

