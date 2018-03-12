/**
 * Created by Udea-Manager on 2017/8/16.
 */

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import setting from '../../config/settings';
import router from '../../router/index';
import store from '../../store/index'

Vue.use(VueAxios, axios);
import {
    cbs,
    gbs
} from 'config/';

Vue.axios.defaults.baseURL = setting.gbs.host;


// //http response 拦截器
// axios.interceptors.response.use(
//     response => {
//         console.log('进入 response:');
//         console.log(response);
//         const urlRequest = response.config.url.split('/');
//         console.log(urlRequest)
//         // console.log(urlRequest[4])//上线时用
//         console.log(urlRequest[2])// 测试时用
//         if(urlRequest[2]=='other'){
//             return response;
//         }else{
//             if(response.data.retCode===0){
//                 console.log('我进入了一次请求')
//                 //请求成功一次就刷新token,要是超过10分钟没操作就会跳转到loginExpires页面
//                 getRefreshToken();
//             }
//             return response;
//         }
//
//         // getRefreshToken()
//
//     },
//     err => {
//         console.log('response error:');
//         console.log(err);
//         if (err.response) {
//             switch (err.response.status) {
//                 case 401:
//                     console.log('401,超时登录');
//                     router.replace({
//                         path: 'loginExpires',
//                         query: {redirect: router.currentRoute.fullPath}
//                     });
//                     store.commit('REMOVE_TOKEN');
//                     break;
//                 case 403:
//                     console.log('403,无权限');
//                     router.replace({
//                         path:'Unauthorized',
//                         query:{redirect:router.currentRoute.fullPath}
//                     })
//             }
//         }
//         return Promise.reject(err.response);
//     });
axios.install = (Vue) => {
    Vue.prototype.$axios = axios
};


export default axios


export function getRefreshToken() {
    console.log('刷新token')
    console.log(store.state.token.token.token)
    console.log(store.state.token.token.token)
    console.log(store.state.token.token.token)
    $.get({
        url:setting.gbs.host+'/auth/token',
        headers: {'Authorization':'Bearer ' + store.state.token.token.token}
    }).then(function (res) {
        console.log('update_token')
        const tokenList = JSON.parse(res)
        console.log(tokenList.data.token)
        store.dispatch('update_token',{token:tokenList.data.token})
    }).catch(function (err) {

    })
}
