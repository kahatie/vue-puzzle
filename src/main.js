const { createApp } = require('vue');
import App from './App.vue';
import headbreaker from 'headbreaker';

const app = createApp(App);
// force load window.headbreaker need for libray canvas
window.headbreaker = headbreaker;
app.mount('#app');
