import Vue from 'vue';
import { User } from '@/types';
import { monthNames, shortMonthNames } from '@/utils/constants';

Vue.filter('date', (value: Date) => {
    if (value) {
      return (value.getMonth() + 1) + '/' +  value.getDate() + '/' + value.getFullYear();
    }
});

Vue.filter('longDate', (value: Date) => {
  if (value) {
    return monthNames[value.getMonth()] + ' ' +  value.getDate();
  }
});

Vue.filter('shortDate', (value: Date) => {
  if (value) {
    return shortMonthNames[value.getMonth()] + ' ' +  value.getDate();
  }
});

Vue.filter('shortDescription', (value: string) => {
  if (value) {
    if (value.length > 80) {
      return value.substring(0, 80) + '...';
    }
    return value;
  }
});

Vue.filter('shorterDescription', (value: string) => {
  if (value) {
    if (value.length > 50) {
      return value.substring(0, 50) + '...';
    }
    return value;
  }
});

Vue.filter('shortestDescription', (value: string) => {
  if (value) {
    if (value.length > 20) {
      return value.substring(0, 20) + '...';
    }
    return value;
  }
});

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
});

Vue.filter('name', (value: User) => {
    if (value) {
      return value.firstName + ' ' + value.lastName;
    }
});

Vue.filter('capitalize', (value: string) => {
    if (value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
});

Vue.filter('lowercase', (value: string) => {
    if (value) {
      return value.toLowerCase();
    }
});
