<template>
  <div class="home">
    <span class="home_left">
      <h2 class="home_title">Welcome</h2>
      <p class="home_text">
        Create Projects
        <br />
        Keep track of progress
        <br />
        Assign tasks
        <br />
      </p>
    </span>
    <sign-up class="home_signup" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import SignUp from '@/components/SignUp.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    SignUp,
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';

.home {
  background-color: fade(@medium-sea-green, 20%);
  display: grid;
  grid-column-gap: 1rem;
  grid-template:
    "left signup"
    ~'/' 1fr 1fr;
  margin: 3rem auto;
  width: 80%;

  &_left {
    align-items: center;
    grid-area: left;
    display: flex;
    flex-direction: column;
    padding: 3rem 0;
  }

  &_title {
    color: @madison;
  }

  &_text {
    color: @madison;
    font-size: 1.8rem;
    line-height: 5rem;
    padding-left: 5rem;
  }

  &_signup {
    background: none !important;
    grid-area: signup;
  }
}
</style>

