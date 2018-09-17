import firebase from 'firebase';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { firebaseConfig } from '@/firebase-config';

Vue.config.productionTip = false;
let app: any;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user: any) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App),
    });
  }
});
