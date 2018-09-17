<template>
  <div class="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
          <p>Loading...</p>
      </div>
    </transition>
    <h2 class="login_title">Log In</h2>
    <Form class="login_form" buttonText="Log In" :toggleDialog="() => null" :submit="onLogin">
      <TextInput class="login_input" label="Email" v-model="email" />
      <PasswordInput class="login_input" label="Password" v-model="password" />
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
import * as fb from '@/firebaseConfig';
import { RootState } from '@/store/types';

export default {
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
};
</script>

