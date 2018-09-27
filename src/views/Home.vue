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

<style lang="less" scoped>
@import '../less/variables.less';

.home {
  // align-items: center;
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
  }

  &_signup {
    background: none !important;
    grid-area: signup;
  }
}
</style>

