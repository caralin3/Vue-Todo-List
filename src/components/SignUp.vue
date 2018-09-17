<template>
  <div class="signup">
    <h2 class="signup_title">Sign Up</h2>
    <Form class="signup_form" buttonText="Sign Up" :toggleDialog="() => null" :submit="onSignUp">
      <TextInput class="signup_input" label="Email" v-model="email" />
      <PasswordInput class="signup_input" label="Password" v-model="password" />
      <PasswordInput class="signup_input" label="Confirm Password" v-model="passwordConfirm" />
    </Form>
    <p>
      <span class="signup_login">Already have an account?</span>
      <router-link class="signup_login" to="/login">Log In</router-link>
    </p>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
import Vue from 'vue';
import Form from '@/components/Form.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextInput from '@/components/TextInput.vue';

export default {
  components: {
    Form,
    PasswordInput,
    TextInput,
  },
  data: () => ({
    email: String,
    password: String,
    passwordConfirm: String,
  }),
  methods: {
    onSignUp(this: any) {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user: any) => {
          console.log(user, 'Account created');
          this.$router.replace('/');
        },
        (err: any) => {
          console.log('Error', err.message);
        },
      );
    },
  },
};
</script>

