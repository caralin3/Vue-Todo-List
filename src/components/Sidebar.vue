<template>
  <div class="sidebar">
    <div class="sidebar_header">
      <h1 class="sidebar_title">
        <router-link :to="this.$route.path">{{ title }}</router-link>
      </h1>
      <i class="fas fa-bars sidebar_menu" @click="onClick" />
    </div>
    <div class="sidebar_nav" :class="{'sidebar_active': active}">
      <router-link :to="{ path: this.$route.path, query: { filter: 'activity'}}">Activity</router-link>
      <router-link :to="{ path: this.$route.path, query: { filter: 'board'}}">Board</router-link>
      <router-link :to="{ path: this.$route.path, query: { filter: 'features'}}">Features</router-link>
      <router-link :to="{ path: this.$route.path, query: { filter: 'items'}}">Items</router-link>
      <router-link :to="{ path: this.$route.path, query: { filter: 'members'}}">Team Members</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'sidebar',

  props: {
    title: {
      default: 'Project',
      type: String,
    },
  },

  data: () => ({
    active: false,
  }),

  methods: {
    onClick(this: any) {
      this.active = !this.active;
    },
  },
});
</script>

<style lang="less">
@import '../less/variables.less';

.sidebar {
  align-items: center;
  // background-color: fade(@medium-sea-green, 20%);
  box-shadow: 3px 3px 5px rgba(114, 113, 113, 0.4);
  display: flex;
  flex-direction: column;
  grid-area: sidebar;
  min-height: 100vh;

  &_menu {
    display: none;
  }

  &_title {
    color: @madison;
    font-size: 1.5rem;
    padding: 1rem 2rem;
    text-align: center;

    a {
      color: @madison;

      &.router-link-exact-active {
        color: @medium-sea-green;
      }
    }
  }

  &_nav {
    display: flex;
    flex-direction: column;
    width: 100%;

    a {
      color: @madison;
      font-size: 1rem;
      font-weight: bold;
      padding: 1rem 0;
      text-align: center;
      // transition: 0.2s ease;
      width: 100%;

      &:hover {
        background-color: @medium-sea-green;
        box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);
        color: @white;
      }

      &.router-link-exact-active {
        background-color: @medium-sea-green;
        box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);
        color: @white;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .sidebar {
    min-height: 100%;
    width: 100%;

    &_header {
      align-items: center;
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    &_title {
      font-size: 1.5rem;
      padding: 0 2rem;
    }

    &_menu {
      color: @medium-sea-green;
      display: block;
      font-size: 1.5rem;
      padding: 2rem;
    }

    &_nav {
      display: none;
    }

    &_active {
      display: flex;
      flex-direction: column;
      width: 100%;
  
      a {
        color: @madison;
        font-size: 1rem;
        font-weight: bold;
        padding: 1rem 0;
        text-align: center;
        // transition: 0.2s ease;
        width: 100%;
  
        &:hover {
          background-color: @medium-sea-green;
          box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);
          color: @white;
        }
  
        &.router-link-exact-active {
          background-color: @medium-sea-green;
          box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);
          color: @white;
        }
      }
    }
  }
}
</style>
