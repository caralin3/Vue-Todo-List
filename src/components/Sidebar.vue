<template>
  <div class="sidebar">
    <div class="sidebar_header">
      <h1 class="sidebar_title">
        {{ title }}
      </h1>
      <i class="fas fa-bars sidebar_menu" @click="onClick" />
    </div>
    <div class="sidebar_nav" :class="{'sidebar_active': active}">
      <router-link
        :class="{'sidebar_nav-active': filter === 'overview'}"
        :to="{ path: this.$route.path, query: { filter: 'overview'}}"
      >
        <span :class="{'sidebar_nav-active-text': filter === 'overview'}">
          Overview
        </span>
      </router-link>
      <router-link
        :class="{'sidebar_nav-active': filter === 'activity'}"
        :to="{ path: this.$route.path, query: { filter: 'activity'}}"
      >
        <span :class="{'sidebar_nav-active-text': filter === 'activity'}">
          Activity
        </span>
      </router-link>
      <router-link
        :class="{'sidebar_nav-active': filter === 'board'}"
        :to="{ path: this.$route.path, query: { filter: 'board'}}"
      >
        <span :class="{'sidebar_nav-active-text': filter === 'board'}">
          Board
        </span>
      </router-link>
      <router-link
        :class="{'sidebar_nav-active': filter === 'features'}"
        :to="{ path: this.$route.path, query: { filter: 'features'}}"
      >
        <span :class="{'sidebar_nav-active-text': filter === 'features'}">
          Features
        </span>
      </router-link>
      <router-link
        :class="{'sidebar_nav-active': filter === 'items'}"
        :to="{ path: this.$route.path, query: { filter: 'items'}}"
      >
        <span :class="{'sidebar_nav-active-text': filter === 'items'}">
          Items
        </span>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Sidebar',

  props: {
    title: {
      default: 'Project',
      type: String,
    },
  },

  data: () => ({
    active: false,
    filter: '',
  }),

  created(this: any) {
    this.filter = this.$route.query.filter;
  },

  methods: {
    onClick(this: any) {
      this.active = !this.active;
    },
  },

  watch: {
    '$route.query.filter'(this: any) {
      this.filter = this.$route.query.filter;
    },
  },
});
</script>

<style lang="less">
@import '../less/variables.less';

.sidebar {
  align-items: center;
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
      width: 100%;

      &:hover {
        background-color: @medium-sea-green;
        box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);
        color: @white;
      }
    }

    &-active {
      background-color: @medium-sea-green;
      box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);

      &-text {
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

        &-active {
        background-color: @medium-sea-green;
        box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);

        &-text {
          color: @white;
        }
      }
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
        width: 100%;
  
        &:hover {
          background-color: @medium-sea-green;
          box-shadow: 2px 1px 3px rgba(114, 113, 113, 0.4);
          color: @white;
        }
      }
    }
  }
}
</style>
