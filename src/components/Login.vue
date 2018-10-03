<template>
  <div class="login" :class="{'login_loading': performingRequest}">
    <h2 class="login_title">Log In</h2>
    <Form class="login_form" buttonText="Log In" :toggleDialog="() => null" :submit="onLogin">
      <text-input class="login_input" label="Email" v-model="email" />
      <password-input class="login_input" label="Password" v-model="password" />
    </Form>
    <router-link class="login_forgot" to="/forgotPassword">Forgot Password?</router-link>
    <p class="login_signup">
      <span class="login_signup-text">Don't have an account?</span>
      <router-link class="login_signup-link" to="/">Sign Up</router-link>
    </p>
    <transition name="fade">
      <div v-if="errorMsg !== ''" class="error-msg">
          <p>{{ errorMsg }}</p>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions, mapState } from 'vuex';
import Form from '@/components/Form.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextInput from '@/components/TextInput.vue';
import * as fb from '@/firebase';
import { RootState } from '@/types';

export default Vue.extend({
  name: 'Login',

  components: {
    Form,
    PasswordInput,
    TextInput,
  },

  data: () => ({
    email: String,
    errorMsg: '',
    password: String,
    performingRequest: false,
  }),

  computed: {
    ...mapState({
      currentUser: (state: RootState) => state.currentUser,
      userProfile: (state: RootState) => state.userProfile,
    }),
  },

  methods: {
    ...mapActions([
      'setCurrentUser',
      'fetchUserProfile',
    ]),
    onLogin(this: any) {
      this.performingRequest = true;
      fb.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((user: any) => {
          this.getUser(user);
        }).catch((err: any) => {
          console.log(err.message);
          this.errorMsg = err.message;
        });
    },
    getUser(this: any, user: any) {
      fb.usersCollection.doc(user.user.uid).get()
        .then((curr: any) => {
          const currentUser = {
            email: curr.data().email,
            first: curr.data().firstName,
            id: curr.id,
            last: curr.data().lastName,
          };
          this.setCurrentUser(currentUser);
          this.fetchUserProfile(user);
          this.performingRequest = false;
          this.$router.replace('/projects');
        }).catch((err: any) => {
          console.log(err.message);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.login {
  align-items: center;
  background-color: fade(@medium-sea-green, 20%);
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  width: 75%;

  &_loading {
    cursor: wait;
  }

  &_title {
    color: @madison;
  }

  &_form {
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }

  &_input {
    display: grid;
    grid-column-gap: 1rem;
    grid-template: "label input";

    label {
      font-weight: bold;
      grid-area: label;
    }

    input {
      grid-area: input;
    }
  }

  &_forgot {
    color: @madison;

    &:hover {
      color: @medium-sea-green;
      text-decoration: underline;
    }
  }

  &_signup {
    &-text {
      color: @madison;
      padding: 1rem 0.5rem;
    }

    &-link {
      color: @madison;      
      
      &:hover {
        color: @medium-sea-green;
        text-decoration: underline;
      }
    }
  }
}

@media only screen and (max-width: 640px) {
  .login {  
    &_input {
      display: grid;
      grid-row-gap: 1rem;
      grid-template: "label" "input";
  
      label {
        font-weight: bold;
        grid-area: label;
      }
  
      input {
        grid-area: input;
      }
    }
  }
}
</style>
