<template>
  <div class="signup">
    <h2 class="signup_title">Sign Up</h2>
    <Form class="signup_form" buttonText="Sign Up" :toggleDialog="() => null" :submit="onSignUp">
      <TextInput class="signup_input" label="First Name" v-model="firstName" />
      <TextInput class="signup_input" label="Last Name" v-model="lastName" />
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
import Vue from 'vue';
import { mapActions } from 'vuex';
import * as fb from '@/firebase';
import Form from '@/components/Form.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TextInput from '@/components/TextInput.vue';
import { MutationType } from '@/store/mutation-types';
import { User } from '@/types';

export default Vue.extend({
  name: 'SignUp',

  components: {
    Form,
    PasswordInput,
    TextInput,
  },

  data: () => ({
    email: '',
    errorMsg: String,
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
    performingRequest: false,
  }),

  methods: {
    ...mapActions([
      'setCurrentUser',
      'fetchUserProfile',
    ]),
    isValid(this: any) {
      return this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.passwordConfirm &&
        this.password === this.passwordConfirm;
    },
    onSignUp(this: any) {
      this.performingRequest = true;
      if (this.isValid()) {
        fb.auth.createUserWithEmailAndPassword(this.email, this.password)
          .then((user: any) => {
            const currentUser: User = {
              email: this.email,
              firstName: this.firstName,
              id: user.user.uid,
              lastName: this.lastName,
            };
            this.setCurrentUser(currentUser);
            // create user object
            fb.usersCollection.doc(user.user.uid).set({
              firstName: this.firstName,
              lastName: this.lastName,
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
      } else {
        console.log('Missing');
      }
    },
  },
});
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.signup {
  align-items: center;
  background-color: fade(@medium-sea-green, 20%);
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  width: 75%;

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

  &_login {
    color: @madison;
    padding: 1rem 0.5rem;

    &-link:hover {
      color: @medium-sea-green;
      text-decoration: underline;
    }
  }
}

@media only screen and (max-width: 640px) {
  .signup {  
    
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
