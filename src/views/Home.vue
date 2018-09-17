<template>
  <div class="home">
    <span class="home_left">
      <h2 class="home_title">Welcome</h2>
      <p class="home_text">
        Create Projects, keep track of progress, assign tasks.
        <br />
        Create different features for each project.
      </p>
    </span>
    <SignUp class="home_signup" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SignUp from '@/components/SignUp.vue';

@Component({
  components: {
    SignUp,
  },
  data: () => ({
  }),
})
export default class Home extends Vue {}
</script>
