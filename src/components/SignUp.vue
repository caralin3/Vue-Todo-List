<template>
  <div class="signup">
    <h2 class="signup_title">Sign Up</h2>
    <Form class="signup_form" buttonText="Sign Up" :toggleDialog="() => null" :submit="onSignUp">
      <TextInput class="signup_input" label="First Name" v-model="first" />
      <TextInput class="signup_input" label="Last Name" v-model="last" />
      <TextInput class="signup_input" label="Email" v-model="email" />
      <PasswordInput class="signup_input" label="Password" v-model="password" />
      <PasswordInput class="signup_input" label="Confirm Password" v-model="passwordConfirm" />
    </Form>
    <p>
      <span class="signup_login">Already have an account?</span>
      <router-link class="signup_login signup_login-link" to="/login">Log In</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';
import { mapActions } from 'vuex';
import * as fb from '@/firebaseConfig';
import Form from '@/components/Form.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextInput from '@/components/TextInput.vue';
import { MutationType } from '@/store/mutation-types';
import { User } from '@/types';

export default {
  components: {
    Form,
    PasswordInput,
    TextInput,
  },
  data: () => ({
    email: String,
    errorMsg: String,
    first: String,
    last: String,
    password: String,
    passwordConfirm: String,
    performingRequest: false,
  }),
  methods: {
    ...mapActions([
      'setCurrentUser',
      'fetchUserProfile',
    ]),
    onSignUp(this: any) {
      this.performingRequest = true;
      fb.auth.createUserWithEmailAndPassword(this.email, this.password)
        .then((user: any) => {
          const currentUser: User = {
            email: this.email,
            first: this.first,
            id: user.user.uid,
            last: this.last,
          };
          this.setCurrentUser(currentUser);
          // create user object
          fb.usersCollection.doc(user.user.uid).set({
            firstName: this.first,
            lastName: this.last,
            email: this.email,
          }).then(() => {
            this.fetchUserProfile(user);
            this.performingRequest = false;
            this.$router.replace('/projects');
          }).catch((err: any) => {
            console.log(err);
            this.errorMsg = err.message;
          });
        },
        (err: any) => {
          console.log('Error', err.message);
          this.performingRequest = false;
          this.errorMsg = err.message;
        },
      );
    },
  },
};
</script>

