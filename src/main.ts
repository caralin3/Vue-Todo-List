import Vue from 'vue';
import App from './App.vue';
import '@/less/index.less';
import router from './router';
import store from './store';
import * as fb from '@/firebaseConfig';

Vue.config.productionTip = false;
let app: any;

fb.auth.onAuthStateChanged((user: any) => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: (h) => h(App),
    });
  }
});
