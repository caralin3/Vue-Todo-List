import Vue from 'vue';
import { User } from '@/types';

Vue.filter('date', (value: Date) => {
    if (value) {
      return (value.getMonth() + 1) + '/' +  value.getDate() + '/' + value.getFullYear();
    }
  },
);

Vue.filter('time', (value: Date) => {
    if (value) {
      const hours = (value.getHours() + 11) % 12 + 1;
      let label = 'AM';
      if (value.getHours() > 11) {
        label = 'PM';
      }
      if (value.getMinutes().toString().length === 1) {
        return hours + ':0' +  value.getMinutes() + ' ' + label;
      }
      return hours + ':' +  value.getMinutes() + ' ' + label;
    }
  },
);

Vue.filter('name', (value: User) => {
    if (value) {
      return value.firstName + ' ' + value.lastName;
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
