import Vue from 'vue';
import App from './App';

//form校验
import Rules from '@/utils/rules'
Vue.prototype.$rules = Rules

// colorUi
import cuCustom from './common/colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom)

// baseUrl,request
import api from '@/common/api.js'
Vue.prototype.$http = api.request
Vue.prototype.$baseUrl = api.baseUrl
Vue.prototype.$imgUpLoad = api.imgUpLoad

import {regionList} from '@/common/region.js';
Vue.prototype.$regionList = regionList;

Vue.prototype.$eap_user = uni.getStorageSync("eap_user");
Vue.prototype.$eap_user_token = uni.getStorageSync("eap_user_token");

// 验证用户是否登录，在需要用户登录的页面onLoad()钩子中进行检测，具体用户参考 /pages/userCenter/index
import checkLogin from '@/utils/checkLogin.js';
Vue.prototype.$checkLogin = checkLogin

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();