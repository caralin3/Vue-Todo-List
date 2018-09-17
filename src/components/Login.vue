<template>
  <div class="login">
    <h2 class="login_title">Log In</h2>
    <Form class="login_form" buttonText="Log In" :toggleDialog="() => null" :submit="onLogin">
      <TextInput class="login_input" label="Email" v-model="email" />
      <PasswordInput class="login_input" label="Password" v-model="password" />
    </Form>
    <p>
      <span class="login_signup">Don't have an account?</span>
      <router-link class="login_signup" to="/signup">Sign Up</router-link>
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
  }),
  methods: {
    onLogin(this: any) {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user: any) => {
          console.log(user, 'Logged In');
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

