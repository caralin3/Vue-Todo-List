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
    password: String,
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
      fb.auth.signInWithEmailAndPassword(this.email, this.password)
        .then((user: any) => {
          this.getUser(user);
        },
        (err: any) => {
          console.log('Error', err.message);
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
          this.$router.replace('/');
        }).catch((err: any) => {
          console.log(err);
        });
    },
  },
};
</script>

