/**
 * Created by Udea-Manager on 2017/8/16.
 */

import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);
import {
    cbs,
    gbs
} from 'config/';

Vue.axios.defaults.baseURL = gbs.host;

export default function ({
                             type,
                             path,
                             data,
                             fn,
                             errFn,
                             tokenFlag,
                             headers,
                             opts
                         } = {}) {
    var options = {
        methods: type,
        url: path,
        headers: headers && typeof headers === 'object' ? headers : {}
    };
    var api_flag = true;
    //检测接口权限--后做

    if (api_flag === true) {
        options[type === 'get' ? 'params' : 'data'] = data;
        if (tokenFlag !== true) {
            // data.token = 'Bearer '+this.$store.state.user.userinfo.token;
            options.headers.token = 'Bearer ' + this.$store.state.user.userinfo.token;
        }
        if (opts && typeof opts === 'object') {
            for (var f in opts) {
                options[f] = opts[f]
            }
        }
        axios.interceptors.request.use(
            config => {
                return config;
            },
            err => {
                return Promise.reject(err);
            });
        Vue.axios(options).then((res) => {
            if (res.data[gbs.api_status_key_field] === gbs.api_status_value_field) {
                gbs.api_custom[res.data[gbs.api_status_key_field]].call(this, res.data);
                if (gbs.api_data_field) {
                    fn(res.data[gbs.api_data_field]);
                } else {
                    fn(res.data);
                }
            } else {
                if (gbs.api_custom[res.data[gbs.api_status_key_field]]) {
                    if (errFn) {
                        errFn.call(this, res.data);
                    } else {
                        cbs.statusError.call(this, res.data);
                    }
                }
            }
        }).catch((err) => {
            console.log(this.$store.state.user.userinfo.toke);
            // this.$store.dispatch('hide_loading');
        })
    }
    else {
        this.$alert('您没用权限请求该接口', '请求错误', {
            confirmButtonText: '确定',
            type: 'warning'
        });
    }
};
