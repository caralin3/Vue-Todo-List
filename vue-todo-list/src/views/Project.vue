<template>
  <div class="project">
    <Sidebar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex';
import Sidebar from '@/components/Sidebar.vue';

@Component({
  components: {
    Sidebar,
  },
  data: () => ({
  }),
  methods: {
  },
})
export default class Project extends Vue {}
</script>
