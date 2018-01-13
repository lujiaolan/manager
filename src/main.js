import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

import "babel-polyfill";

import moment from 'moment';
Vue.prototype.moment = moment;
import accounting from 'accounting';
Vue.prototype.accounting = accounting;

import store from 'store/';

import axios from 'axios';
Vue.prototype.$ajax = axios;

import 'jquery'

Vue.use(ElementUI);

new Vue({
    moment,
    router,
    store,
    render: h => h(App)
}).$mount('#app');
