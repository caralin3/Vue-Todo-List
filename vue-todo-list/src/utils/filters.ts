import Vue from 'vue';
import { User } from '@/types';

Vue.filter('date', (value: Date) => {
    if (value) {
      return value.getMonth() + '/' +  value.getDate() + '/' + value.getFullYear();
    }
  },
);

Vue.filter('time', (value: Date) => {
    if (value) {
      const hours = (value.getHours() + 11) % 12 + 1;
      return hours + ':' +  value.getMinutes();
    }
  },
);

Vue.filter('name', (value: User) => {
    if (value) {
      return value.first + ' ' + value.last;
    }
  },
);

Vue.filter('capitalize', (value: string) => {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
);

Vue.filter('lowercase', (value: string) => {
    if (value) {
      return value.toLowerCase();
    }
  },
);
