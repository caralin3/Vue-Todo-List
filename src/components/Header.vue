<template>
  <div class="header">
    <h1>
      <router-link class="header_title" :to="currentUser === null ? '/' : '/projects'" :exact="true">Plan-It</router-link>
    </h1>
    <div class="header_nav">
      <router-link v-if="currentUser === null" to="/" :exact="true">Home</router-link>
      <router-link v-if="currentUser !== null" to="/projects">Projects</router-link>
      <router-link v-if="currentUser !== null" to="/settings">Settings</router-link>
      <router-link v-if="currentUser === null" class="header_nav-login" to="/login">Log In</router-link>
      <button v-if="currentUser !== null" class="header_nav-logout" @click="onLogOut">Log Out</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import * as fb from '@/firebase';
import { RootState } from '@/types';

export default Vue.extend({
  name: 'Header',

  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
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
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.header {
  background-color: @medium-sea-green;
  box-shadow: 3px 3px 5px rgba(114, 113, 113, 0.4);
  display: flex;
  justify-content: space-between;
  padding-left: 2rem;
  width: 100%;

  &_title {
    color: @white;
  }

  &_nav {
    margin-right: 2rem;
    padding: 2rem;

    a {
      color: @madison;
      font-weight: bold;
      padding: 0.5rem 1rem;

      &:hover {
        color: @white;
      }

      &.router-link-active {
        color: @white;
      }
    }

    &-logout {
      color: @madison;
      font-size: 1rem;
      font-weight: bold;

      &:focus,
      &:hover {
        color: @white;
        cursor: pointer;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .header {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 0 1rem 0;

    &_nav {
      margin: 0;
      padding: 0;
    }
  }
}
</style>
