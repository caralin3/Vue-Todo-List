<template>
  <div class="forgot">
    <h2 class="forgot_title">Forgot Password</h2>
    <h3 v-if="!emailSent">An email will be sent to reset your password.</h3>
    <div v-if="!emailSent">
      <Form class="forgot_form" buttonText="Send Email" :toggleDialog="() => null" :submit="onForgotPass">
        <TextInput class="forgot_input" label="Email" v-model.trim="email" />
      </Form>
      <p>
        <span class="forgot_login">Already have an account?</span>
        <router-link class="forgot_login forgot_login-link" to="/login">Log In</router-link>
      </p>
    </div>
    <div v-else class="forgot_sent">
      <h3>Check your email for a link to reset your password.</h3>
      <router-link class="forgot_loginButton" to="/login">Back to Log In</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import * as fb from '@/firebase';
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
    emailSent: false,
    errorMsg: String,
  }),
  methods: {
    onForgotPass(this: any) {
      fb.auth.sendPasswordResetEmail(this.email).then((user: any) => {
        this.emailSent = true;
      }).catch((err: any) => {
        console.log(err);
        this.errorMsg = err.message;
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import '../less/variables.less';
@import '../less/button.less';

.forgot {
  align-items: center;
  background-color: fade(@medium-sea-green, 20%);
  display: flex;
  flex-direction: column;
  margin: 3rem auto;
  padding: 2rem;
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

    &-link {
      color: @madison;      
      
      &:hover {
        color: @medium-sea-green;
        text-decoration: underline;
      }
    }
  }

  &_sent {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &_loginButton {
    .button;
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
