<template>
  <div class="projectComponents">
    <div class="projectComponents_header">
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import { Item, Feature, Project } from '@/types';

export default {
  components: {
  },

  created(this: any) {
    this.id = this.$route.params.id;
  },

  data: () => ({
    id: String,
    openDetails: false,
  }),

  computed: {
    ...mapState({
      projects: (state: any) => state.projects.projects,
    }),
  },

  methods: {
    toggleDialog(this: any) {
      this.show = !this.show;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

</style>
